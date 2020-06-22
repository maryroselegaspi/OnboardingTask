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
            data: [],
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
            direction: null, 
        }
    }

    //Connect  to the server
    componentDidMount = ()=> {
        this._isMounted = true;
        this.populateData();       
    }

    //Update/display the table after modification
    componentDidUpdate = () => {
        this._isMounted = true;
        this.populateData();
    }

    //Unmont the component
    componentWillUnmount() {
        this._isMounted =false
    }

    // This will handle the input area to reflect the user's input value
    onChangeName = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value })
    }; 
    onChangePrice = (e) => {
        e.preventDefault();
        this.setState({ price: e.target.value });
    }

    //Cancel operation
    onCancel = (e) => { 
        this.setState({createshowModal:false, editshowModal:false, deleteshowModal:false, id:0, name:'', price:null})
    }

    //Add new data
    onCreate=(e)=>{
        e.preventDefault();
        this.setState({createshowModal:false, name:'', price:null})

        let productObject = { 
            Name: this.state.name,
            Price: parseFloat(this.state.price),      
        }

        axios.post("/api/product/postproduct", productObject)  
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
            this.componentDidUpdate()
            this.setState({editshowModal:false, name:'', price:null});

    }

    //Delete Data
    onDeleteConfirmation = (id) => {      
        axios.delete("/api/product/deleteproduct/"+ id)
        this.componentDidUpdate();
        this.setState({deleteshowModal:false, name:'', price:null});       
    }
    
    // Fetch Data from the back-end
    populateData(){
        axios.get("api/product").then(result => {

            if(this._isMounted){
                const response = result.data;
                this.setState({ data: response, loading: false, failed: false, error:""});
            }        
        })
        .catch(error => {
            this.setState({data: [], loading: false, failed: true, error:"Product data could not be loaded"});
        });
    }
    //Sorting -
    handleSort = (clickedColumn) => {
        const { data, direction } = this.state;

        this.setState({ direction: 'asc' });

        let copydata = [...data];

        const sortedlist = (direction === 'asc')
            ? _.orderBy(copydata, clickedColumn, 'asc')
            : _.orderBy(copydata, clickedColumn, 'desc')

        this.setState({ 
            data: sortedlist,
            direction: direction === 'asc'? 'desc' : 'asc',
            column:clickedColumn
        })
    }
   
    render(){
        const { editshowModal, createshowModal, deleteshowModal, name, price, id, direction} = this.state;
        const { onCancel, onChangeName, onChangePrice, onUpdate, onDeleteConfirmation, onCreate} = this;
        let productList = this.state.data;
        let content = null;
            
        if (productList !== ''){
            content = productList.map(sto => (
                <tr key={sto.id}>
                    <td>{sto.name}</td>
                    <td>{sto.price}</td>
                    <td>
                        {/* Edit modal */}
                        <Modal size="small" 
                                onClose={()=>this.editshowModal()} open={editshowModal} 
                            trigger={<Button color="yellow"  onClick={()=> this.setState({editshowModal:true, id:sto.id, name:sto.name, price:sto.price})}><Icon className='edit' /> EDIT</Button>}   >
                            <Header content="Edit Product" />
                            <Modal.Content>
                                <Form >
                                    <Form.Input  label="Name"  value={name} onChange={onChangeName}></Form.Input>
                                    <Form.Input  label="Price"  value={price} onChange={onChangePrice}></Form.Input>
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="black" onClick={() => onCancel()}>cancel</Button>
                                <Button color="green" onClick={()=>onUpdate(id)}> <i className="icon check" />edit</Button>
                            </Modal.Actions>
                        </Modal>                           
                    </td>
                    <td>
                        {/* Delete modal */}
                        <Modal size="small" 
                            onClose={this.deleteshowModal} open={deleteshowModal} 
                            trigger={<Button color="red"  onClick={()=> this.setState({deleteshowModal:true, id:sto.id})}><Icon className='trash alternate' /> DELETE</Button>}   >
                            <Header content="Delete product" />
                            <Modal.Content>
                                <h4> Are you sure?</h4>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="black" onClick={() => onCancel()}>cancel</Button>
                                <Button color="red" onClick={() => onDeleteConfirmation(id)}> <i className="icon delete" />delete</Button>
                            </Modal.Actions>
                        </Modal>           
                    </td>
                </tr>
                ))
            } 
        
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