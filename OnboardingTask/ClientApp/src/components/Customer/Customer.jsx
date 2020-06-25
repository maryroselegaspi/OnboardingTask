import React, {Component} from 'react';
import axios from 'axios';
import { Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from 'lodash'
import { Edit } from './CustomerEdit';
import { Delete } from './CustomerDelete';
import { Create } from './CustomerCreate';
//import Api from '../Api'
import {api} from '../Api'


export class Customer extends Component
{
    _isMounted = false;
    API_URL = api.API_URL;

    constructor(props){
        super(props);
        
        this.state = {
            customer: [],
            loading: true,
            failed: false,
            id: 0,
            name: '',
            address: '',
            error: '',
            column: null,
            direction: null,
        };
        
    }

   
    
    //Connect  to the server
    componentDidMount = ()=> {
        this._isMounted = true;
        this.populateCustomerData();
    }

    //Update/display the table after modification
    componentDidUpdate = () => {
        this._isMounted = true;
        this.populateCustomerData()
    }

    //Unmount component
    componentWillUnmount() {
        this._isMounted = false;
    }

    //Fetch data from the backend
    populateCustomerData = () => {
        axios.get(this.API_URL + "/api/customer")
            .then(result => {
                if (this._isMounted) {
                    const response = result.data;
                    this.setState({ customer: response, loading: false, failed: false, error: "" });
                    
                }

                //console.log(this.state.customer);
            })
            .catch(error => {
                this.setState({ customer: [], loading: false, failed: true, error: "Customer data could not be loaded" });
            })
            
        

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
    
   
    render()
    
    {
            const { direction } = this.state;
        let  customerList  = [...this.state.customer];
            //let content = [];
            
            if(customerList !== ''){
                var content = customerList.map(cust => (
                    //content = Object.values(customerList).forEach((cust) => (
                    <Table.Row key={cust.id}>
                        <Table.Cell>{cust.name}</Table.Cell>
                        <Table.Cell>{cust.address}</Table.Cell>
                        <Table.Cell> <Edit id={cust.id} name={cust.name} address={cust.address} API_URL={this.API_URL} /> </Table.Cell>
                        <Table.Cell> <Delete id={cust.id} API_URL={this.API_URL} /> </Table.Cell>
                    </Table.Row>
                )); 
                //console.log("customerList:", customerList)
        } 
        
        return (
                <React.Fragment>
                <Create API_URL={this.API_URL} /> 
 
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