import React, { Component } from 'react';
import axios from 'axios';
import { Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from 'lodash'
import { Create } from './Create';
import { Delete } from './Delete';
import { Edit } from './Edit';
import Moment from 'react-moment';
import moment from 'moment/moment.js';
import { TableHeaderLayout } from './TableLayout';

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
            customer: '',
            product: '',
            store: '',
            error: '',
            column: null,
            direction: null,
        }

    }
    //Connect  to the server
    componentDidMount = () => {
        this._isMounted = true;
        this.populateStoreData();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    //Update/display the table after modification
    componentDidUpdate = () => {
        this._isMounted = true;
        this.populateStoreData()
    }

    // Fetch Data from the back-end
    populateStoreData() {
        axios.get("api/sales")
            .then(result => {
                if (this._isMounted) {
                    this.setState({ salesdata: result.data, failed: false, error: "", loading: false });
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

    render() {
        let dataList = this.state.salesdata;
        let content = null;

        if (dataList !== '') {
            content = dataList.map(sto => (
                <tr key={sto.id}>
                    <td>{sto.customer.name}</td>
                    <td>{sto.product.name}</td>
                    <td>{sto.store.name}</td>
                    <td><Moment format="DD/MM/YYYY">{sto.datesold}</Moment></td>
                    <td> <Edit
                        id={sto.id}
                        datesold={moment(sto.datesold).format("DD/MM/YYYY")}
                        customer={sto.customer.id}
                        product={sto.product.id}
                        store={sto.store.id} />
                    </td> 
                    <td> <Delete
                        id={sto.id} />
                    </td>
                </tr>
            ))
        }

        return (
            <React.Fragment>
                <Create />

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