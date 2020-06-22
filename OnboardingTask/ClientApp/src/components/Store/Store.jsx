import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header, Icon, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from 'lodash'


export class Store extends Component
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
            address:'',
            createshowModal: false,
            editshowModal: false,
            deleteshowModal: false,
            error: '',
            column: null,
            direction: null, // should always be null
        }

    }
    //Connect  to the server
    componentDidMount = ()=> {
        this._isMounted = true;
        this.populateStoreData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // This will handle the input area to reflect the user's input value
    onChangeName = (e) => this.setState({name: e.target.value }); 

    onChangeAddress = (e) => { this.setState({ address: e.target.value});}

    //Cancel operation
    onCancel = (e) => { 
        this.setState({createshowModal:false, editshowModal:false, deleteshowModal:false, id:0, name:'', address:''})
    }

    //Update/display the table after modification
    componentDidUpdate =() => {this.populateStoreData()}
    
    //Add new data
    onCreate=(e)=>{
        e.preventDefault();
        this.setState({createshowModal:false, name:'', address:''})

        let storeObject = { 
            Name: this.state.name,
            Address: this.state.address,      
        }
    
        axios.post("/api/store/poststore", storeObject)      
        this.componentDidUpdate();
 
    }
    
    // Edit data
    onUpdate = (id) => {
        //e.preventDefault();
        let object = {
            Name: this.state.name,
            Address: this.state.address,
        }

        axios.put("api/store/putstore/"+ id, object)  
            this.componentDidUpdate()
            this.setState({editshowModal:false, name:'', address:''});

    }

    //Delete Data
    onDeleteConfirmation(id){
        axios.delete("/api/store/deletestore/"+ id)
        this.componentDidUpdate();
        this.setState({deleteshowModal:false, name:'', address:''});       
    }
    
    // Fetch Data from the back-end
    populateStoreData(){
        axios.get("api/store")
            .then(result => {

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

        const sortedlist = ((direction === 'asc')
            ? _.orderBy(copydata, clickedColumn, 'asc')
            : _.orderBy(copydata, clickedColumn, 'desc'));

        console.log('sorting', sortedlist, clickedColumn, direction); //remove this

        this.setState({ 
            //store:[],
            store: sortedlist,
            direction: direction === 'asc'? 'desc' : 'asc',
            column:clickedColumn,
        }, () => {console.log('after setState', store, direction)}
        )
         //remove this     
    }
   
    render(){
  
        let storeList = this.state.store;
        let content = null;
            
        if(storeList !== ''){
            content = storeList.map(sto => (
                <tr key={sto.id}>
                    <td>{sto.name}</td>
                    <td>{sto.address}</td>
                    <td>
                        {/* Edit modal                                */}
                        <Modal size="small" 
                                onClose={()=>this.editshowModal()} open={this.state.editshowModal} 
                            trigger={<Button color="yellow"  onClick={()=> this.setState({editshowModal:true, id:sto.id, name:sto.name, address:sto.address})}><Icon className='edit' /> EDIT</Button>}   >
                            <Header content="Edit Store" />
                            <Modal.Content>
                                <Form >
                                    <Form.Input  label="Name"  value={this.state.name} onChange={this.onChangeName}></Form.Input>
                                    <Form.TextArea label="Address"  value={this.state.address} onChange={this.onChangeAddress}></Form.TextArea>
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
                            <Header content="Delete store" />
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
        
              
          return (
            <React.Fragment>

               {/* Create New customer Modal */}
                <Modal size="small"   
                        onClose={this.createshowModal} open={this.state.createshowModal} 
                        trigger={<Button color="blue" onClick={() => this.setState({createshowModal:true})}>New Store</Button>}   >
                        <Header content="Create Store" />
                        <Modal.Content>
                            <Form >
                                <Form.Input  label="NAME" placeholder ='Name' value={this.state.name} onChange={(e) =>this.onChangeName(e)}></Form.Input>
                                <Form.Input  label="ADDRESS" placeholder ='Address' value={this.state.address} onChange={(e)=> this.onChangeAddress(e)}></Form.Input>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="black" onClick={() =>this.onCancel()}>cancel</Button>
                            <Button color="green" onClick={(e)=>this.onCreate(e)}> create   <i className=" icon check" /></Button>
                        </Modal.Actions>              
                </Modal>
               
                {/* Table to display all data */}                 
                <Table className= 'sortable celled fixed'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell 
                                  className='sorted ascending'
                                 sorted={this.state.direction==='asc'? 'ascending': 'descending'}
                                 onClick={()=>this.handleSort('name')}                            
                              > Name  
                            </Table.HeaderCell>
                            <Table.HeaderCell 
                                className=''
                                sorted={this.state.direction ==='asc'? 'ascending': 'descending'}
                                onClick={()=>this.handleSort('address')}                               
                              >Address
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