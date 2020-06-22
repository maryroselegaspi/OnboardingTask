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
            direction: null, 
        }   
    }
    
    //Connect  to the server
    componentDidMount = ()=> {
        this._isMounted = true;
        this.populateCustomerData();
    }

    //Unmount component
    componentWillUnmount() {
        this._isMounted = false;
    }

    //Update/display the table after modification
    componentDidUpdate = () => {
        this._isMounted = true;
        this.populateCustomerData()
    }

    //Fetch data from the backend
    populateCustomerData = () => {
        axios.get("/api/customer")
            .then(result => {
                if (this._isMounted) {
                    const response = result.data;
                    this.setState({ customer: response, loading: false, failed: false, error: "" });
                }
            })
            .catch(error => {
                this.setState({ customer: [], loading: false, failed: true, error: "Customer data could not be loaded" });
            });
    }

    // This will handle the input area to reflect the user's input value
    onChangeName = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }
    onChangeAddress = (e) => {
        e.preventDefault();
        this.setState({ address: e.target.value });
    }

    //Cancel the operation
    onCancel = (e) => { 
        this.setState({createshowModal:false, editshowModal:false, deleteshowModal:false, id:0, name:'', address:''})
    }

    //Add new data
    onCreate=(e)=> {
        e.preventDefault();
        this.setState({createshowModal:false, name:'', address:''})

        let customerObject = { 
            Name: this.state.name,
            Address: this.state.address,      
        } 
        axios.post("/api/customer/postcustomer", customerObject)      
        this.componentDidUpdate();
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
    onDeleteConfirmation =(id) => {
        axios.delete("/api/customer/deletecustomer/"+ id)
        this.componentDidUpdate()
        this.setState({deleteshowModal:false, name:'', address:''});        
    }
    
   
    //Sorting -
    handleSort = (clickedColumn) => {
        const { customer, direction } = this.state
        this.setState({direction:'asc'})

        let copydata = [...customer];

        const sortedcustomer = (direction === 'asc')
            ? _.orderBy(copydata, clickedColumn, 'asc')
            : _.orderBy(copydata, clickedColumn, 'desc')

        this.setState({ 
            customer:sortedcustomer,
            direction: direction === 'asc'? 'desc' : 'asc',
            column:clickedColumn
        })
    }
   
    render(){
            const { createshowModal, editshowModal, deleteshowModal, name, address, id, direction } = this.state;
            const { onChangeName, onChangeAddress, onCreate, onUpdate, onCancel, onDeleteConfirmation } = this;
            let customerList = this.state.customer;
            let content = null;
            
            if(customerList !== ''){
                content = customerList.map(cust => (
                    <Table.Row key={cust.id}>
                        <Table.Cell>{cust.name}</Table.Cell>
                        <Table.Cell>{cust.address}</Table.Cell>
                        <Table.Cell>
                            {/* Edit modal */}
                            <Modal size="small"
                                onClose={() => this.editshowModal()} open={editshowModal}
                                trigger={<Button color="yellow" onClick={() => this.setState({ editshowModal: true, id: cust.id, name: cust.name, address: cust.address })}><Icon className='edit' /> EDIT</Button>}   >
                                <Header content="Edit Customer" />
                                <Modal.Content>
                                    <Form >
                                        <Form.Input  label="Name" value={name} onChange={onChangeName}></Form.Input>
                                        <Form.TextArea  label="Address" value={address} onChange={onChangeAddress}></Form.TextArea>
                                    </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="black" onClick={() => onCancel()}>cancel</Button>
                                    <Button color="green" onClick={() => onUpdate(id)}> <i className="icon check" />edit</Button>
                                </Modal.Actions>
                            </Modal>                         
                        </Table.Cell>
                        <Table.Cell>
                            {/* Delete modal */}
                            <Modal size="small"
                                onClose={this.deleteshowModal} open={deleteshowModal}
                                trigger={<Button color="red" onClick={() => this.setState({ deleteshowModal: true, id: cust.id })}><Icon className='trash alternate' /> DELETE</Button>}   >
                                <Header content="Delete customer" />
                                <Modal.Content>
                                    <h4> Are you sure?</h4>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="black" onClick={() => onCancel()}>cancel</Button>
                                    <Button color="red" onClick={() => onDeleteConfirmation(id)}> <i className="icon delete" />delete</Button>
                                </Modal.Actions>
                            </Modal>
                        </Table.Cell>
                    </Table.Row>
                        )
                 )            
            } 
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