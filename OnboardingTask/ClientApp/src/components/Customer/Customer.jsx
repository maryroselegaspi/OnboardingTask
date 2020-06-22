import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Table, Form, Button, Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from 'lodash'


export class Customer extends Component
{
    _isMounted = false;
    constructor(props){
        super(props);
        

        this.state = {
            customer: [],
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
            //_isUnsubscribeAPi:false,
        }

        
    }
    
    //Connect  to the server
    componentDidMount = (props)=> {
       // props._isUnsubscribeAPi = true;
        this._isMounted =true
        this.populateCustomerData();
    }
    componentWillUnmount() {
        this._isMounted =false
    }


    // This will handle the input area to reflect the user's input value
    onChangeName = (e) => this.setState({name: e.target.value }); 

    onChangeAddress = (e) => { this.setState({ address: e.target.value});}

    //Cancel the operation
    onCancel = (e) => { 
        this.setState({createshowModal:false, editshowModal:false, deleteshowModal:false, id:0, name:'', address:''})
    }

    onCreateModalClose = () => this.setState({createshowModal:false})
    
    //Update/display the table after modification
    componentDidUpdate =() => {this.populateCustomerData()}
    
    //Add new data
    onCreate=(e)=>{
        e.preventDefault();
        this.setState({createshowModal:false, name:'', address:''})

        let customerObject = { 
            Name: this.state.name,
            Address: this.state.address,      
        }
    
        axios.post("/api/customer/postcustomer", customerObject)      
        this.componentDidUpdate();
        //console.log(customerObject);
    }
    // Edit data
    onUpdate = (id) => {
        let custObject = {
            Name: this.state.name,
            Address: this.state.address,
        }

        axios.put("api/customer/putcustomer/"+ id, custObject)
            this.componentDidUpdate()
            this.setState({editshowModal:false, name:'', address:''});
    }

    //Delete Data
    onDeleteConfirmation(id){
        axios.delete("/api/customer/deletecustomer/"+ id)
        this.componentDidUpdate()
        this.setState({deleteshowModal:false, name:'', address:''});        
    }
    
    //Fetch data from the backend
     populateCustomerData(){
        axios.get("/api/customer")
            .then(result => {
                if (this._isMounted){
                    const response = result.data;
                    this.setState({customer: response, loading: false, failed: false, error:""});
                }
            })
            .catch(error => {
                this.setState({customer: [], loading: false, failed: true, error:"Customer data could not be loaded"});
            });       
    }

    //Sorting -- Issue on 
    handleSort = (clickedColumn) => {
        const { customer, direction } = this.state
        console.log('last customer', customer) //remove this
        this.setState({direction:'asc'})

        let copydata = [...customer];

        const sortedcustomer = (direction === 'asc')
            ? _.orderBy(copydata, clickedColumn, 'asc')
            : _.orderBy(copydata, clickedColumn, 'desc')

        console.log('sorting', sortedcustomer, clickedColumn, direction) //remove this

        this.setState({ 
            //customer:[],
            customer:sortedcustomer,
            direction: direction === 'asc'? 'desc' : 'asc',
            column:clickedColumn
        })
        console.log('after setState', customer, direction) //remove this     
    }
   
    render(){

            let customerList = this.state.customer;
            let content = null;
            
            if(customerList !== ''){
                content = customerList.map(cust => (
                        <Table.Row key={cust.id}>
                            <Table.Cell>{cust.name}</Table.Cell>
                            <Table.Cell>{cust.address}</Table.Cell>
                            <Table.Cell>
                                {/* Edit modal                                */}
                                <Modal size="small"
                                    onClose={() => this.editshowModal()} open={this.state.editshowModal}
                                    trigger={<Button color="yellow" onClick={() => this.setState({ editshowModal: true, id: cust.id, name: cust.name, address: cust.address })}><Icon className='edit' /> EDIT</Button>}   >
                                    <Header content="Edit Customer" />
                                    <Modal.Content>
                                        <Form >
                                            <Form.Input  label="Name" value={this.state.name} onChange={this.onChangeName}></Form.Input>
                                            <Form.TextArea  label="Address" value={this.state.address} onChange={this.onChangeAddress}></Form.TextArea>
                                        </Form>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color="black" onClick={() => this.onCancel()}>cancel</Button>
                                        <Button color="green" onClick={() => this.onUpdate(this.state.id)}> <i className="icon check" />edit</Button>
                                    </Modal.Actions>
                                </Modal>                         
                            </Table.Cell>
                            <Table.Cell>
                                {/* Delete modal */}
                                <Modal as={Form} size="small"
                                    onClose={this.deleteshowModal} open={this.state.deleteshowModal}
                                    trigger={<Button color="red" onClick={() => this.setState({ deleteshowModal: true, id: cust.id })}><Icon className='trash alternate' /> DELETE</Button>}   >
                                    <Header content="Delete customer" />
                                    <Modal.Content>
                                        <h4> Are you sure?</h4>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color="black" onClick={() => this.onCancel()}>cancel</Button>
                                        <Button color="red" onClick={() => this.onDeleteConfirmation(this.state.id)}> <i className="icon delete" />delete</Button>
                                    </Modal.Actions>
                                </Modal>
                            </Table.Cell>
                        </Table.Row>
                         )
                 )
                
            } 
        
        const { direction, name, address, createshowModal } = this.state;
        const { onChangeName, onChangeAddress, onCancel, onCreate} = this;
          return (
            <React.Fragment>
               

               {/* Create New customer Modal */}
                <Modal size="small"   
                        onClose={this.createshowModal} open={createshowModal} 
                        trigger={<Button color="blue" onClick={() => this.setState({createshowModal:true})}>New Customer</Button>}   >
                        <Header content="Create Customer" />
                       
                        <Modal.Content>
                            <Form >
                                <Form.Input  label="NAME" placeholder ='Name' value={name} onChange={(e) => onChangeName(e)}></Form.Input>
                                <Form.Input  label="ADDRESS" placeholder ='Address' value={address} onChange={(e)=> onChangeAddress(e)}></Form.Input>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="black" onClick={() => onCancel()}>cancel</Button>
                            <Button color="green" onClick={(e)=> onCreate(e)}> Create   <i className=" icon check" /></Button>
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
                              >
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell 
                                className=''
                                sorted={direction ==='asc'? 'ascending': 'descending'}
                                onClick={()=>this.handleSort('address')}                               
                              >
                                Address
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