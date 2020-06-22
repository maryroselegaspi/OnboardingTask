//import React, {Component} from 'react';
//import axios from 'axios';
//import { Modal, Table, Form, Button, Header, Icon } from "semantic-ui-react";
//import "semantic-ui-css/semantic.min.css";
//import orderBy from 'lodash/orderBy'
//import ReactTable from 'react-table';
////import Update from './Update';



//export class Sales extends Component
//{
//    constructor(props){
//        super(props);

//        this.state = {
//            customer: [],
//            loading: true,
//            failed: false,
//            id:0,
//            name:'',
//            address:'',
//            createshowModal: false,
//            editshowModal: false,
//            deleteshowModal: false,
//            error: '',
//            column: null,
//            direction:null,
//            columnTosort:'',
//            sortDirection:'desc'

//        }
       
//    }
    
    
//    //Sorting
//    handleSort = clickedColumn => {
//        const invertDirection =  {asc: 'desc', desc: 'asc'};
//        this.setState(state => ({
//            columnTosort: clickedColumn,
//            sortDirection:
//                state.columnTosort === clickedColumn
//                ? invertDirection[state.sortDirection]
//                :'asc'
//        }))

       
//    }

//    componentDidMount = ()=> this.populateCustomerData();

//    onModalOpen= () => this.setState ({showModal: true})

//    onModalClose =() => { this.setState ({showModal: false})}

//    onChangeName = (e) => this.setState({name: e.target.value }); 

//    onChangeAddress = (e) => { this.setState({ address: e.target.value});}

//    onCancel = (e) => { 
//        const {history} = this.props;
//        //this.onModalClose();
//        this.setState({createshowModal:false, editshowModal:false, deleteshowModal:false, id:0, name:'', address:''})
//    }
//    componentDidUpdate =() => {this.populateCustomerData()}
    

//    onCreate=(e)=>{
//        e.preventDefault();
//        const {history} = this.props;
//        //this.onModalClose();
//        this.setState({createshowModal:false, name:'', address:''})

//        let customerObject = { 
//            Name: this.state.name,
//            Address: this.state.address,      
//        }
    
//        axios.post("/api/customer/postcustomer", customerObject)  
      
//        this.componentDidUpdate();
//        console.log(customerObject);
//    }

//    onUpdate = (id) => {
//        //e.preventDefault();
//        //const {history} = this.props;
//        //const {id} = this.props.match.params;

//        let custObject = {
//            Name: this.state.name,
//            Address: this.state.address,
//        }

//        axios.put("api/customer/putcustomer/"+ id, custObject)
//            //this.setState ({editshowModal:false})    
//        //.then(this.onModalClose())
//            this.componentDidUpdate()
//            this.setState({editshowModal:false, name:'', address:''});
//    }

//    onDeleteConfirmation =(id) => {
//        // const {id} = this.props.match.params;
//        // const {history} = this.props;

//        axios.delete("/api/customer/deletecustomer/"+ id);
//        //this.setState({deleteshowModal:false})
//        //this.onModalClose();
//        this.componentDidUpdate();
//        this.setState({deleteshowModal:false, name:'', address:''});       
//    }
    

//    populateCustomerData =() => {
//        axios.get("/api/customer").then(result => {const response = result.data;
//            this.setState({customer: response, loading: true, failed: false, error:""});
//        })
//        .catch(error => {
//            this.setState({customer: [], loading: false, failed: true, error:"Customer data could not be loaded"});
//        })
//        ;

//    }
   
//    //ALL CUSTOMER DETAILS
//    // renderAllCustomerTable(customer){
//    //     //const{name, address,showModal} = this.state;
//    //     //const{onModalClose, onChangeName, onChangeAddress, onCancel, onUpdate} = this;
//    //     //let id = 0;
//    //     return (
//    //         <React.Fragment>              
//    //             <table className="table table-striped">
//    //             <thead>
//    //                 <tr>
//    //                     <th>Name</th>
//    //                     <th>Address</th>
//    //                     <th>Action</th>
//    //                     <th>Action</th>
//    //                 </tr>
//    //             </thead>
//    //             <tbody>
//    //                 {
//    //                     customer.map(cust => (
//    //                     <tr key={cust.id}>
//    //                         <td>{cust.name}</td>
//    //                         <td>{cust.address}</td>
//    //                         <td>
//    //                             {/* Edit modal                                */}
//    //                             <Modal size="small" 
//    //                                  onClose={()=>this.onModalClose()} open={this.state.showModal} 
//    //                                 trigger={<Button color="yellow"  onClick={()=> this.setState({showModal:true, id:cust.id, name:cust.name, address:cust.address})}><Icon className='edit' /> EDIT</Button>}   >
//    //                                 <Header content="Edit Customer" />
//    //                                 <Modal.Content>
//    //                                     <Form >
//    //                                         <Form.Input fluid label="Name"  value={this.state.name} onChange={this.onChangeName}></Form.Input>
//    //                                         <Form.TextArea fluid label="Address"  value={this.state.address} onChange={this.onChangeAddress}></Form.TextArea>
//    //                                     </Form>
//    //                                 </Modal.Content>
//    //                                 <Modal.Actions>
//    //                                     <Button color="black" onClick={() => this.onCancel()}>cancel</Button>
//    //                                     <Button color="green" onClick={()=>this.onUpdate(this.state.id)}> <i className="icon check" />edit</Button>
//    //                                 </Modal.Actions>
//    //                             </Modal>                       
//    //                         </td>
//    //                         <td>
//    //                             {/* Delete modal */}
//    //                             <Modal as={Form}  size="small" 
//    //                                      onClose={this.onModalClose} open={this.state.showModal} 
//    //                                     trigger={<Button color="red"  onClick={()=> this.setState({showModal:true, id:cust.id})}><Icon className='trash alternate' /> DELETE</Button>}   >
//    //                                     <Header content="Delete customer" />
//    //                                     <Modal.Content>
//    //                                         <h4> Are you sure?</h4>
//    //                                     </Modal.Content>
//    //                                     <Modal.Actions>
//    //                                         <Button color="black" onClick={() => this.onCancel()}>cancel</Button>
//    //                                         <Button color="red" onClick={() => this.onDeleteConfirmation(this.state.id)}> <i className="icon delete" />delete</Button>
//    //                                     </Modal.Actions>
//    //                                 </Modal>           
//    //                         </td>
//    //                     </tr>
//    //                     ))
//    //                 }               
//    //             </tbody>
//    //         </table>
//    //         </React.Fragment>
         
//    //     );
//    // }


//    render() {
        

//            const {columnTosort, sortDirection} = this.state;
//            let customerList = orderBy(customer, columnTosort, sortDirection);
//            let content = null;
            
//            if(customerList != ''){
//                content = customerList.map( (cust) => (
//                        <Table.Row key={cust.id}>
//                            <Table.Cell>{cust.name}</Table.Cell>
//                            <Table.Cell>{cust.address}</Table.Cell>
//                            <Table.Cell>
//                                {/* Edit modal                                */}
//                                <Modal size="small"
//                                    onClose={() => this.editshowModal()} open={this.state.editshowModal}
//                                    trigger={<Button color="yellow" onClick={() => this.setState({ editshowModal: true, id: cust.id, name: cust.name, address: cust.address })}><Icon className='edit' /> EDIT</Button>}   >
//                                    <Header content="Edit Customer" />
//                                    <Modal.Content>
//                                        <Form >
//                                            <Form.Input fluid label="Name" value={this.state.name} onChange={this.onChangeName}></Form.Input>
//                                            <Form.TextArea fluid label="Address" value={this.state.address} onChange={this.onChangeAddress}></Form.TextArea>
//                                        </Form>
//                                    </Modal.Content>
//                                    <Modal.Actions>
//                                        <Button color="black" onClick={() => this.onCancel()}>cancel</Button>
//                                        <Button color="green" onClick={() => this.onUpdate(this.state.id)}> <i className="icon check" />edit</Button>
//                                    </Modal.Actions>
//                                </Modal>

//                                {/* <Button color="yellow"  onClick={()=> this.props({id:cust.id, name:cust.name, address:cust.address})}><Icon className='edit' /> EDIT</Button>   */}

//                            </Table.Cell>
//                            <Table.Cell>
//                                {/* Delete modal */}
//                                <Modal as={Form} size="small"
//                                    onClose={this.deleteshowModal} open={this.state.deleteshowModal}
//                                    trigger={<Button color="red" onClick={() => this.setState({ deleteshowModal: true, id: cust.id })}><Icon className='trash alternate' /> DELETE</Button>}   >
//                                    <Header content="Delete customer" />
//                                    <Modal.Content>
//                                        <h4> Are you sure?</h4>
//                                    </Modal.Content>
//                                    <Modal.Actions>
//                                        <Button color="black" onClick={() => this.onCancel()}>cancel</Button>
//                                        <Button color="red" onClick={() => this.onDeleteConfirmation(this.state.id)}> <i className="icon delete" />delete</Button>
//                                    </Modal.Actions>
//                                </Modal>
//                            </Table.Cell>
//                        </Table.Row>
//                         )
//                 )
                
//            } 
        
//          const { direction, column, customer, name, address } = this.state;
//          return (
//            <React.Fragment>

//               {/* Create New customer Modal */}
//                <Modal size="small"   
//                        onClose={this.createshowModal} open={this.state.createshowModal} 
//                        trigger={<Button color="blue" onClick={() => this.setState({createshowModal:true})}>New Customer</Button>}   >
//                        <Header content="Create Customer" />
//                        <Modal.Content>
//                            <Form >
//                                <Form.Input fluid label="NAME" placeholder ='Name' value={this.state.name} onChange={(e) =>this.onChangeName(e)}></Form.Input>
//                                <Form.Input fluid label="ADDRESS" placeholder ='Address' value={this.state.address} onChange={(e)=> this.onChangeAddress(e)}></Form.Input>
//                            </Form>
//                        </Modal.Content>
//                        <Modal.Actions>
//                            <Button color="black" onClick={() =>this.onCancel()}>cancel</Button>
//                            <Button color="green" onClick={(e)=>this.onCreate(e)}> Create   <i className=" icon check" /></Button>
//                        </Modal.Actions>
                    
//                </Modal>

//                    {/* All customer Details Data */}

//                <Table className= 'sortable celled fixed' >
//                    <Table.Header>
//                        <Table.Row>
//                            <Table.HeaderCell 
//                                //sorted={this.state.column === 'name'? direction:null}
//                                onClick={this.handleSort('name')} >
//                                Name
//                            </Table.HeaderCell>
//                            <Table.HeaderCell 
//                                //sorted={this.state.column === 'address'? direction:nul}
//                                onClick={this.handleSort('address')}>
//                                Address
//                            </Table.HeaderCell>
//                            <th>Action</th>
//                            <th>Action</th>
//                        </Table.Row>
//                    </Table.Header>
//                    <Table.Body>
//                        {/* {_.map(content, ({name, address}))
//                        } */}
//                            {content}

                        
//                    </Table.Body>
//                </Table>

                
                      
           
//            </React.Fragment>

//             );
//    }

//}
