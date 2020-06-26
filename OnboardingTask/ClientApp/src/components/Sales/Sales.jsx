import React, { Component } from 'react';
import axios from 'axios';
import { Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Create } from './Create';
import { Delete } from './Delete';
import { Edit } from './Edit';
import Moment from 'react-moment';
import moment from 'moment/moment.js';
import { TableHeaderLayout } from './TableLayout';
import { api } from '../Api'


export class Sales extends Component {
    _isMounted = false;
    //API_URL = "https://mvpreactshop.azurewebsites.net";
    API_URL = api.API_URL;
    constructor(props) {
        super(props);

        this.state = {
            salesdata: [],
            loading: true,
            failed: false,
            name: '',
            id: 0,
            customer: '',
            product: '',
            store: '',
            error: '',
        }
        //this.API_URL = new Api();
    }
    //API_URL = api.API_URL

    //Mount the component
    componentDidMount = () => {
        this._isMounted = true;
        this.populateData();
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
    populateData() {
        axios.get(this.API_URL+ "api/sales")
            .then(result => {
                if (this._isMounted) {
                    this.setState({ salesdata: result.data, failed: false, error: "", loading: false });
                }         
            })
            .catch(error => {
                this.setState({ salesdata: [], loading: false, failed: true, error: "Store data could not be loaded" });
            });      
    }

    render() {
        let dataList = this.state.salesdata;
        //let content = null;

        if (dataList && dataList.length > 0) {
            var  content = dataList.map(sto => (
                <tr key={sto.id}>
                    <td>{sto.customer.name}</td>
                    <td>{sto.product.name}</td>
                    <td>{sto.store.name}</td>
                    <td><Moment
                        format="DD/MM/YYYY">{sto.datesold}</Moment>
                    </td>
                    <td> <Edit
                        id={sto.id}
                        datesold={moment(sto.datesold).format("DD/MM/YYYY")}
                        customer={sto.customer.id}
                        product={sto.product.id}
                        store={sto.store.id} 
                        API_URL={this.API_URL} />
                    </td> 
                    <td> <Delete
                        id={sto.id}
                        API_URL={this.API_URL}/>
                    </td>
                </tr>
            ))
        }

        return (
            <React.Fragment>

                <Create API_URL={this.API_URL} />

                {/* Table to display all data */}
                <Table className='sortable celled fixed'>
                    <TableHeaderLayout
                        salesdata={this.state.salesdata} />
                    <Table.Body>
                        {content}
                    </Table.Body>
                </Table>

            </React.Fragment>

        );
    }
}