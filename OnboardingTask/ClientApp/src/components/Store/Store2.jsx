import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header, Icon, Table, } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {StoreCreate} from './StoreCreate'




export class Store extends Component
{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
       //this.onStoreCreate = this.onStoreCreate.bind(this);
        this.onStoreUpdate = this.onStoreUpdate.bind(this);
        this.onStoreDelete = this.onStoreDelete.bind(this);
        this.onCancel = this.onCancel.bind(this);
        //this.onModalOpen =this.onModalOpen.bind(this);
        this.onModalClose =this.onModalClose.bind(this);
        //this.onStoreCreateImport=this.onStoreCreateImport(this);
        //this.handleSort=this.handleSort.bind(this);

        this.state = {
            store: [],
            name:'',
            address:'',
            loading: true,
            failed: false,
            error: '',
            showModal: false,
            column: null,
            direction: null,
        }

    }
 
    componentDidMount(){
        this.populateProductData();
    }

    handleSort = (clickedColumn) => () => {
        const { column, store, direction } = this.state
    
        if (column !== clickedColumn) {
          this.setState({
            column: clickedColumn,
            store: store.sortBy(store, [clickedColumn]),
            direction: 'ascending',
          })
    
          return
        }
        this.setState({
            store: store.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
          })
    }

    onModalOpen= () => this.setState ({showModal: true})
    onModalClose() { this.setState ({showModal: false})}

//     onStoreCreate(){
//    const {history} = this.props;
//         history.push('/store/create/');
   
//     }


    onStoreUpdate(id){
        const {history} = this.props;
        history.push('/store/update/'+ id);
    }

    onStoreDelete(id){
        const {history} = this.props;
        history.push('/store/delete/'+ id);
    }

    onChangeName(e){this.setState({name: e.target.value }); }
    onChangeAddress(e){ this.setState({ address: e.target.value});}
    onCancel(e){ const {history} = this.props;
        //history.push('/store/store');
        this.onModalClose();
    }

    onSubmit(e){
        e.preventDefault()
        const {history} = this.props;

        let customerObject = { name: this.state.name, address: this.state.address, }
        axios.post("api/store/poststore", customerObject)
            .then(result => { history.push('/store/store') })
            .then(this.onModalClose());
    }
    
    populateProductData(){
        axios.get("api/store").then(result => { const response = result.data;
            this.setState({store: response, loading: true, failed: false, error:""});
        }); 
    }
  
    //ALL CUSTOMER DETAILS
    renderAllProductTable(store, column, direction ){
        //const { store, column, direction } = this.state
        return (
           
            // <div>                
            //     <table className="ui celled selectable table sortable celled">
            //     <thead>
            //         <tr>
            //             <th>Name</th>
            //             <th>Address</th>
            //             <th>Action</th>
            //             <th>Action</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {
            //             store.map(prod => (
            //             <tr key={prod.id}>
            //                 <td>{prod.name}</td>
            //                 <td>{prod.address}</td>
            //                 <td>
            //                     <div className="form-group">
            //                         <button className="ui yellow button" onClick={() => this.onStoreUpdate(prod.id)}>
            //                             <i className="icon edit"></i> EDIT
            //                         </button>                                  
            //                     </div>
            //                 </td>
            //                 <td>
            //                     <div className="form-group">
            //                         <button className="ui red button" onClick={() => this.onStoreDelete(prod.id)} >
            //                                 <i className="icon trash alternate"></i> DELETE
            //                         </button>
            //                     </div>
            //                 </td>
            //             </tr>
            //             ))
            //         }                   
            //     </tbody>
            // </table>

            // </div>   
            <div>                
                <Table className="sortable celled fixed">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={column === 'name' ? direction : null}
                            onClick={this.handlesort('name')}    
                            >Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'name' ? direction : null}
                            onClick={this.handlesort('name')}    
                            >Address
                        </Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        store.map(prod => (
                        <tr key={prod.id}>
                            <Table.Cell>{prod.name}</Table.Cell>
                            <Table.Cell>{prod.address}</Table.Cell>
                            <Table.Cell>
                                <div className="form-group">
                                    <button className="ui yellow button" onClick={() => this.onStoreUpdate(prod.id)}>
                                        <i className="icon edit"></i> EDIT
                                    </button>                                  
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="form-group">
                                    <button className="ui red button" onClick={() => this.onStoreDelete(prod.id)} >
                                            <i className="icon trash alternate"></i> DELETE
                                    </button>
                                </div>
                            </Table.Cell>
                        </tr>
                        ))
                    }                   
                </Table.Body>
            </Table>

            </div>             
        );
        
    }

    render(){
        const {name, address, showModal, store, column, direction} = this.state
        //  let content = this.state.loading 
        // ? ( this.renderAllProductTable(this.state.store))
        // :  ( <p> <em>Loading...</em></p>)  

        let content = this.state.loading 
        ? ( this.renderAllProductTable(store, column, direction))
        :  ( <p> <em>Loading...</em></p>)  

        return (
            <div>
            {/* Create New Store Modal */}
             <Modal as={Form} 
                onClose={this.onModalClose} open={showModal} size="lg"
                trigger={<Button color="green" onClick={() => this.setState({showModal:true})}><Icon className='plus' />New Store</Button>}   
                >
                    <Header content="Add Store" />
                    <Modal.Content>
                        <Form >
                            <Form.Input fluid label="Name" placeholder ='Name' value={this.state.name} onChange={this.onChangeName}></Form.Input>
                            <Form.Input fluid label="Address" placeholder ='Address' value={this.state.address} onChange={this.onChangeAddress}></Form.Input>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={() => this.onCancel()}>cancel</Button>
                        <Button color="green" close={this.onCancel} onClick={this.onSubmit}> <i className="icon check" />Create</Button>
                    </Modal.Actions>
              </Modal>

              {/* Edit Store Modal */}

              {/* Create New Store Modal */}

                 {/*All customer Details Data */}
                <div>
                        {content}
                </div>
           
            </div>
        );
    }
}