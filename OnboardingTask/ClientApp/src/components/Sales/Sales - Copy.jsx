import React, { Component } from 'react';
import axios from 'axios';
//import { Modal, Form, Button, Header, Icon, Table } from "semantic-ui-react";
import {Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from 'lodash'
import Moment from 'react-moment';
import { Create } from './Create';
import { Delete } from './Delete';
import { Edit } from './Edit';
import moment from 'moment/moment.js';
import { DateInput } from 'semantic-ui-calendar-react';


export class Sales extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            failed: false,
            name: '',
            id: 0,
            date: null,
            customer: '',
            product: '',
            store: '',
            dateSold: null,
            column: null,
            direction: null,
            salesdata: [],
            customerData: [],
            productData: [],
            storeData:[],

        }

    }
    //Connect  to the server
    componentDidMount = () => {
        this._isMounted = true;
        this.populateData();
        this.getCustomerData();
        this.getStoreData();
        this.getProductData();

    }
    componentWillUnmount() {
        this._isMounted = false;
    }


    //Update/display the table after modification
    componentDidUpdate = () => {
        this._isMounted = true;
        this.populateData()
    }

   
    // Fetch Data from the back-end
    populateData =()=> {
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
    //Sorting -
    handleSort = (clickedColumn) => {
        const { store, direction } = this.state
        this.setState({ direction: 'asc' })

        let copydata = [...store];

        const sortedlist = (direction === 'asc')
            ? _.orderBy(copydata, clickedColumn, 'asc')
            : _.orderBy(copydata, clickedColumn, 'desc')

        this.setState({
            store: sortedlist,
            direction: direction === 'asc' ? 'desc' : 'asc',
            column: clickedColumn
        })
    }

    //for options customer data
    getCustomerData = () => {
        axios.get("api/customer")
            .then(result => {
                if (this._isMounted) {
                    let response = result.data
                        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
                        .map(res => { return { key: res.id, value: res.id, text: res.name } })

                    this.setState({
                        customerData: [{ value: '', display: '!!' }].concat(response),
                        failed: false, error: "",
                        loading: false,
                    });
                }
            })
            .catch(error => {
                this.setState({ customerData: [], loading: false, failed: true, error: "Customer data could not be loaded" });
            });
    }
    //for options store data
    getStoreData = () => {
        axios.get("api/store").then(result => {
            if (this._isMounted) {
                let response = result.data
                    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
                    .map(res => { return { key: res.id, value: res.id, text: res.name } })

                this.setState({
                    storeData: [{ value: '', display: '!!' }].concat(response),
                    loading: false,
                    failed: false,
                    error: ""
                });
            }
        })
            .catch(error => {
                this.setState({ storeData: [], loading: false, failed: true, error: "Store data could not be loaded" });
            });
    }
    //for options product data
    getProductData = () => {
        axios.get("api/product").then(result => {
            if (this._isMounted) {
                const response = result.data
                    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
                    .map(res => { return { key: res.id, value: res.id, text: res.name } })

                this.setState({
                    productData: [{ value: '', display: '!!' }].concat(response),
                    loading: false,
                    failed: false,
                    error: ""
                });
            }
        })
            .catch(error => {
                this.setState({ productData: [], loading: false, failed: true, error: "Product data could not be loaded" });
            });
    }

    //Cancel operation
    onCancel = (e) => {
        this.setState({
            editshowModal: false,
            customer: '',
            product: '',
            store: '',
            dateSold: null,
        })
    }


    // Edit data
    onUpdate = (id) => {
        let object = {
            //DateSold: moment(this.state.dateSold).format("DD/MM/YYYY"),
            DateSold: this.state.dateSold,
            CustomerId: this.state.customer,
            ProductId: this.state.product,
            StoreId: this.state.store
        }
        console.log(object)

        axios.put("api/sales/putsales/" + id, object)
            .then(response => alert(response.data))
            .catch(error => alert(error))
            .then(this.setState({ editshowModal: false, dateSold: null, customer: '', product: '', store: '' }));
    }


    render() {
        const { direction } = this.state;
        const { handleSort } = this;
        //const { direction, editshowModal, id, customer, product, store, dateSold, customerData, productData, storeData } = this.state;
        //const { onUpdate, onCancel, handleSort } = this;
        let dataList = this.state.salesdata;
        let content = null;

        if (dataList !== '') {
            content = dataList.map(sto => (
                <tr key={sto.id}>
                    <td>{sto.customer.name}</td>
                    <td>{sto.product.name}</td>
                    <td>{sto.store.name}</td>
                    <td><Moment format="DD/MM/YYYY">{sto.dateSold}</Moment></td>
                    <td> <Edit
                        id={sto.id}
                        customer={sto.customer.id}
                        product={sto.product.id}
                        store={sto.store.id}
                    />
                       


                    
                    </td>
                    <td> <Delete id={sto.id}/>  </td>
                </tr>
            ))
        }

        return (
            <React.Fragment>
                <Create />

                {/* Table to display all data */}
                <Table className='sortable celled fixed'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                className='sorted ascending'
                                sorted={direction === 'asc' ? 'ascending' : 'descending'}
                                onClick={() => handleSort('customer')}
                            > Customer
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                className='sorted ascending'
                                sorted={direction === 'asc' ? 'ascending' : 'descending'}
                                onClick={() => handleSort('product')}
                            > Product
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                className='sorted ascending'
                                sorted={direction === 'asc' ? 'ascending' : 'descending'}
                                onClick={() => handleSort('store')}
                            > Store
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                className=''
                                sorted={direction === 'asc' ? 'ascending' : 'descending'}
                                onClick={() => handleSort('dateSold')}
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