import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from 'lodash'
import Moment from 'react-moment';
import moment from 'moment/moment.js';

import { Delete } from './Delete';
import { Edit } from './Edit';




export class Sales extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            salesdata: [],
            loading: true,
            failed: false,
            name: '',
            id: 0,
            date: null,
            customer: '',
            customerData: [],
            product: '',
            productData: [],
            store: '',
            storeData: [],
            dateSold: null,
            createshowModal: false,
            editshowModal: false,
            deleteshowModal: false,
            error: '',
            column: null,
            direction: null, // should always be null
            nameError: 'Please enter product name',
            priceError: "Please enter price in decimal format"
        }

    }
    //Connect  to the server
    componentDidMount = () => {
        this._isMounted = true
        this.populateStoreData()
        //this.getCustomerData();
        //this.getStoreData();
        //this.getProductData();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    ////for options customer data
    //getCustomerData = () => {
    //    axios.get("api/customer")
    //        .then(result => {
    //            if (this._isMounted) {
    //                let response = result.data
    //                    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    //                    .map(res => { return { key: res.id, value: res.id, text: res.name } })

    //                this.setState({
    //                    customerData: [{ value: '', display: '!!' }].concat(response),
    //                    failed: false, error: "",
    //                    loading: false,
    //                });
    //            }
    //        })
    //        .catch(error => {
    //            this.setState({ customerData: [], loading: false, failed: true, error: "Customer data could not be loaded" });
    //        });
    //}
    ////for options store data
    //getStoreData = () => {
    //    axios.get("api/store").then(result => {
    //        if (this._isMounted) {
    //            let response = result.data
    //                .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    //                .map(res => { return { key: res.id, value: res.id, text: res.name } })

    //            this.setState({
    //                storeData: [{ value: '', display: '!!' }].concat(response),
    //                loading: false,
    //                failed: false,
    //                error: ""
    //            });
    //        }
    //    })
    //        .catch(error => {
    //            this.setState({ storeData: [], loading: false, failed: true, error: "Store data could not be loaded" });
    //        });
    //}
    ////for options product data
    //getProductData = () => {
    //    axios.get("api/product").then(result => {
    //        if (this._isMounted) {
    //            const response = result.data
    //                .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    //                .map(res => { return { key: res.id, value: res.id, text: res.name } })

    //            this.setState({
    //                productData: [{ value: '', display: '!!' }].concat(response),
    //                loading: false,
    //                failed: false,
    //                error: ""
    //            });
    //        }
    //    })
    //        .catch(error => {
    //            this.setState({ productData: [], loading: false, failed: true, error: "Product data could not be loaded" });
    //        });
    //}

    // This will handle the input area to reflect the user's input value
    onChangeName = (e) => this.setState({ name: e.target.value });

    onChangePrice = (e) => { this.setState({ price: e.target.value }); }



    //Cancel operation
    onCancel = (e) => {

        this.setState({ createshowModal: false, editshowModal: false, deleteshowModal: false, id: 0, customer: '', product: '', store: '', dateSold: null })
    }

    //Update/display the table after modification
    componentDidUpdate = () => {
        this._isMounted = true;
        this.populateStoreData()
    }

    //Add new data
    onCreate = (e) => {
        e.preventDefault();
        this.setState({ createshowModal: false, customer: '', product: '', store: '', dateSold: null })

        let storeObject = {
            DateSold: this.state.dateSold,
            CustomerId: this.state.customer,
            ProductId: this.state.product,
            StoreId: this.state.store,
        }

        axios.post("/api/sales/postsales", storeObject)
            .catch(error => console.log(error))

        this.componentDidUpdate();
    }

    //// Edit data
    //onUpdate = (id) => {
    //    let object = {
    //        DateSold: this.state.dateSold,
    //        CustomerId: this.state.customer,
    //        ProductId: this.state.product,
    //        StoreId: this.state.store
    //    }

    //    axios.put("api/sales/putsales/" + id, object)
    //        .then(response => console.log(response.data))
    //        .catch(error => console.log(error))
    //    this.componentDidUpdate()
    //    this.setState({ editshowModal: false, dateSold: null, customer: '', product: '', store: '' });
    //}

    ////Delete Data
    //onDeleteConfirmation(id) {

    //    axios.delete("/api/sales/deletesales/" + id)
    //    this.componentDidUpdate();
    //    this.setState({ deleteshowModal: false, customer: '', product: '', store: '', dateSold: null });
    //}

    // Fetch Data from the back-end
    populateStoreData =()=> {
        axios.get("api/sales")
            .then(result => {
                if (this._isMounted) {
                    const response = result.data;
                    this.setState({ salesdata: response, failed: false, error: "", loading: false });
                }

            })
            .catch(error => {
                this.setState({ salesdata: [], loading: false, failed: true, error: "Store data could not be loaded" });
            });
    }
    //Sorting -- Issue on columns NOT Working  yet
    handleSort = (clickedColumn) => {
        const { store, direction } = this.state
        console.log('last customer', store) //remove this
        this.setState({ direction: 'asc' })

        let copydata = [...store];

        const sortedlist = (direction === 'asc')
            ? _.orderBy(copydata, clickedColumn, 'asc')
            : _.orderBy(copydata, clickedColumn, 'desc')

        console.log('sorting', sortedlist, clickedColumn, direction) //remove this

        this.setState({
            store: sortedlist,
            direction: direction === 'asc' ? 'desc' : 'asc',
            column: clickedColumn
        })
        console.log('after setState', store, direction) //remove this     
    }

    render() {

        let dataList = this.state.salesdata;
        let content = null;

        if (dataList !== '') {
            content = dataList.map(sto => (
                <tr key={sto.id}>
                    <td>{sto.customer.name}</td>
                    <td>{sto.product.name}</td>
                    <td>{sto.store.name}</td>
                    <td><Moment format="DD/MM/YYYY">{sto.dateSold}</Moment></td>
                    <td>
                        <Edit
                            id={sto.id}
                            dateSold={moment(sto.dateSold).format("DD/MM/YYYY")}
                            customer={sto.customer.id}
                            product={sto.product.id}
                            store={sto.store.id}
 
                        />

                        {/* Edit modal  */}
                        {/* <Modal size="small"
                            onClose={() => this.editshowModal} open={editshowModal}
                            trigger={<Button color="yellow" onClick={() => this.setState({ editshowModal: true, id: sto.id, dateSold: moment(sto.dateSold).format("DD/MM/YYYY"), customer: sto.customer.id, product: sto.product.id, store: sto.store.id })}><Icon className='edit' /> EDIT</Button>}   >
                            <Header content="Edit Sales" />
                            <Modal.Content>
                                <Form >
                                    <Form.Input className="dateInput" label="Date" name='date' placeholder="Select Date" value={this.state.dateSold} onChange={(event, { name, value }) => this.setState({ dateSold: value })}></Form.Input>
                                    <Form.Select label="Customer" placeholder="Select Customer" value={this.state.customer} options={this.state.customerData} onChange={(event, { name, value }) => this.setState({ customer: value })} />
                                    <Form.Select label="Product" placeholder="Select Product" value={this.state.product} options={this.state.productData} onChange={(event, { name, value }) => this.setState({ product: value })} />
                                    <Form.Select label="Store" placeholder="Select Store" value={this.state.store} options={this.state.storeData} onChange={(event, { name, value }) => this.setState({ store: value })} />
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="black" onClick={() => this.onCancel()}>cancel</Button>
                                <Button color="green" onClick={() => this.onUpdate(this.state.id)}> <i className="icon check" />edit</Button>
                            </Modal.Actions>
                        </Modal> */}
                    </td>
                    <td> <Delete id={sto.id}/>
                       
                    </td>
                </tr>
            ))
        }

        //const {createshowModal} = this.state;
        return (
            <React.Fragment>


                {/* Create Modal */}
                <Modal size="small"
                    onClose={this.createshowModal} open={this.state.createshowModal}
                    trigger={<Button color="blue" onClick={() => this.setState({ createshowModal: true })}>New Sales</Button>}   >
                    <Header content="Create Sales" />
                    <Modal.Content>
                        <Form >
                            <Form.Input className="dateInput" label="Date" type="date" name="date" value={this.state.dateSold || ""} placeholder={this.state.dateSold} onChange={(event, { name, value }) => this.setState({ dateSold: value })}></Form.Input>
                            <Form.Select label="Customer" placeholder={'Select Customer'} value={this.state.customer} options={this.state.customerData} onChange={(event, { name, value }) => this.setState({ customer: value })} />
                            <Form.Select label="Product" placeholder={'Select Product'} value={this.state.product} options={this.state.productData} onChange={(event, { name, value }) => this.setState({ product: value })} />
                            <Form.Select label="Store" placeholder={'Select Store'} value={this.state.store} options={this.state.storeData} onChange={(event, { name, value }) => this.setState({ store: value })} />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={() => this.onCancel()}>cancel</Button>
                        <Button color="green" onClick={(e) => this.onCreate(e)}> create   <i className=" icon check" /></Button>
                    </Modal.Actions>
                </Modal>

                {/* Table to display all data */}
                <Table className='sortable celled fixed'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                className='sorted ascending'
                                sorted={this.state.direction === 'asc' ? 'ascending' : 'descending'}
                                onClick={() => this.handleSort('customer')}
                            > Customer
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                className='sorted ascending'
                                sorted={this.state.direction === 'asc' ? 'ascending' : 'descending'}
                                onClick={() => this.handleSort('product')}
                            > Product
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                className='sorted ascending'
                                sorted={this.state.direction === 'asc' ? 'ascending' : 'descending'}
                                onClick={() => this.handleSort('store')}
                            > Store
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                className=''
                                sorted={this.state.direction === 'asc' ? 'ascending' : 'descending'}
                                onClick={() => this.handleSort('dateSold')}
                            >Date
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