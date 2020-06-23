import React, { Component } from 'react';
import { Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from 'lodash'


export class TableHeaderLayout extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            salesdata: this.props.salesdata,
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
 
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    //Sorting -
    handleSort = (clickedColumn) => {
        this._isMounted = true;

        if (this._isMounted) {
            const { salesdata, direction } = this.state
            this.setState({ direction: 'asc' })
            let copydata = [...salesdata];

            const sortedlist = (direction === 'asc')
                ? _.orderBy(copydata, clickedColumn, 'asc')
                : _.orderBy(copydata, clickedColumn, 'desc')

            this.setState({
                salesdata: sortedlist,
                direction: direction === 'asc' ? 'desc' : 'asc',
                column: clickedColumn
            })
        }
        
    }

    render() {
  
        return (
          
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
                        onClick={() => this.handleSort('datesold')}
                    >Date
                    </Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
                    
        );
    }
}