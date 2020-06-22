import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header, Icon, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from 'lodash'

//var _isMounted = false
export class Product extends Component
{
    _isMounted = false;
    constructor(props){
        super(props);

        this.state = {
            store: [],
            loading: true,
            failed: false,
            id:0,
            name:'',
            price:null,
            createshowModal: false,
            editshowModal: false,
            deleteshowModal: false,
            error: '',
            column: null,
            direction: null, // should always be null
            nameError : 'Please enter product name',
            priceError: "Please enter price in decimal format",

        }
        
    }
    

    //Connect  to the server
    componentDidMount = ()=> {
        this._isMounted = true;
        this.populateStoreData();       
    }
    componentWillUnmount() {
        this._isMounted =false
    }

    // This will handle the input area to reflect the user's input value
    onChangeName = (e) => this.setState({name: e.target.value }); 

    onChangePrice = (e) => { this.setState({ price: e.target.value});}

    //Cancel operation
    onCancel = (e) => { 
        this.setState({createshowModal:false, editshowModal:false, deleteshowModal:false, id:0, name:'', price:null})
    }

    //Update/display the table after modification
    componentDidUpdate =() => {this.populateStoreData()}
    
    //Add new data
    onCreate=(e)=>{
        e.preventDefault();
        this.setState({createshowModal:false, name:'', price:null})

        let storeObject = { 
            Name: this.state.name,
            Price: parseFloat(this.state.price),      
        }
        console.log(storeObject)
        console.log(typeof(storeObject.Price), typeof(storeObject.Name))
    
        axios.post("/api/product/postproduct", storeObject) 
            .then(response => console.log(response.data))
            .catch( error => console.log(error))
        //this.setState({createshowModal:false, name:'', price:null})   
        this.componentDidUpdate();
        
 
    }
    
    // Edit data
    onUpdate = (id) => {
        //e.preventDefault();
        let object = {
            Name: this.state.name,
            Price: parseFloat(this.state.price),  
        }

        axios.put("api/product/putproduct/"+ id, object)  
            .then(response => console.log(response.data))
            .catch( error => console.log(error))
            this.componentDidUpdate()
            this.setState({editshowModal:false, name:'', price:null});

    }

    //Delete Data
    onDeleteConfirmation(id){
        
        axios.delete("/api/product/deleteproduct/"+ id)
        this.componentDidUpdate();
        this.setState({deleteshowModal:false, name:'', price:null});       
    }
    
    // Fetch Data from the back-end
    async populateStoreData(){

        // const response = await axios.get("/api/product");
        // const data =  response.data;
        // this.setState({store: data, loading: false, failed: false, error:""});

        await axios.get("api/product").then(result => {
            if(this._isMounted){
                const response = result.data;
                this.setState({store: response, loading: false, failed: false, error:""});
            }
            
        })
        .catch(error => {
            this.setState({store: [], loading: false, failed: true, error:"Store data could not be loaded"});
        });
    }
    //Sorting -- Issue on 
    handleSort = (clickedColumn) => {
        const { store, direction } = this.state
        console.log('last customer', store) //remove this
        this.setState({direction:'asc'})

        let copydata = [...store];

        const sortedlist = (direction === 'asc')
            ? _.orderBy(copydata, clickedColumn, 'asc')
            : _.orderBy(copydata, clickedColumn, 'desc')

        console.log('sorting', sortedlist, clickedColumn, direction) //remove this

        this.setState({ 
 //           store:[],
            store: sortedlist,
            direction: direction === 'asc'? 'desc' : 'asc',
            column:clickedColumn
        })
        console.log('after setState', store, direction) //remove this     
    }
   
    render(){
  
        let storeList = this.state.store;
        let content = null;
            
        if(storeList !== ''){
            content = storeList.map(sto => (
                <tr key={sto.id}>
                    <td>{sto.name}</td>
                    <td>{sto.price}</td>
                    <td>
                        {/* Edit modal                                */}
                        <Modal size="small" 
                                onClose={()=>this.editshowModal()} open={this.state.editshowModal} 
                            trigger={<Button color="yellow"  onClick={()=> this.setState({editshowModal:true, id:sto.id, name:sto.name, price:sto.price})}><Icon className='edit' /> EDIT</Button>}   >
                            <Header content="Edit Product" />
                            <Modal.Content>
                                <Form >
                                    <Form.Input  label="Name"  value={this.state.name} onChange={this.onChangeName}></Form.Input>
                                    <Form.Input  label="Price"  value={this.state.price} onChange={this.onChangePrice}></Form.Input>
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="black" onClick={() => this.onCancel()}>cancel</Button>
                                <Button color="green" onClick={()=>this.onUpdate(this.state.id)}> <i className="icon check" />edit</Button>
                            </Modal.Actions>
                        </Modal>                           
                    </td>
                    <td>
                        {/* Delete modal */}
                        <Modal as={Form}  size="small" 
                            onClose={this.deleteshowModal} open={this.state.deleteshowModal} 
                            trigger={<Button color="red"  onClick={()=> this.setState({deleteshowModal:true, id:sto.id})}><Icon className='trash alternate' /> DELETE</Button>}   >
                            <Header content="Delete product" />
                            <Modal.Content>
                                <h4> Are you sure?</h4>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="black" onClick={() => this.onCancel()}>cancel</Button>
                                <Button color="red" onClick={() => this.onDeleteConfirmation(this.state.id)}> <i className="icon delete" />delete</Button>
                            </Modal.Actions>
                        </Modal>           
                    </td>
                </tr>
                ))
            } 
        

            const { direction, name, price, createshowModal } = this.state;
            const { onChangeName, onChangePrice, onCancel, onCreate} = this;  
          return (
            <React.Fragment>

               {/* Create New customer Modal */}
                <Modal size="small"   
                        onClose={this.createshowModal} open={createshowModal} 
                        trigger={<Button color="blue" onClick={() => this.setState({createshowModal:true})}>New Product</Button>}   >
                        <Header content="Create Product" />
                        <Modal.Content>
                            <Form >
                                <Form.Input  label="NAME" value={name ||""} placeholder ='Product name'  onChange={(e) =>onChangeName(e)}></Form.Input>
                                <Form.Input  label="PRICE" value={price ||""} placeholder ='10.00'  onChange={(e)=> onChangePrice(e)} ></Form.Input>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="black" onClick={() =>onCancel()}>cancel</Button>
                            <Button color="green" onClick={(e)=>onCreate(e)}> create   <i className=" icon check" /></Button>
                        </Modal.Actions>              
                </Modal>
               
                {/* Table to display all data */}                 
                <Table className= 'sortable celled fixed'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell 
                                  className='sorted ascending'
                                 sorted={direction==='asc'? 'ascending': 'descending'}
                                 onClick={()=>this.handleSort('name')}                            
                              > Name  
                            </Table.HeaderCell>
                            <Table.HeaderCell 
                                className=''
                                sorted={direction ==='asc'? 'ascending': 'descending'}
                                onClick={()=>this.handleSort('price')}                               
                              >Price
                            </Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                            {content}
                    </Table.Body>
                </Table>
            </React.Fragment>

        );
    }
}