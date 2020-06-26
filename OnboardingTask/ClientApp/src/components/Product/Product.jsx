import React, {Component} from 'react';
import axios from 'axios';
import {Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from 'lodash'
import { Edit } from './Edit';
import { Delete } from './Delete';
import { Create } from './Create';
import { api } from '../Api'

export class Product extends Component
{
    _isMounted = false;
    //API_URL = "https://mvpreactshop.azurewebsites.net";
    API_URL = api.API_URL;
    constructor(props){
        super(props);

        this.state = {
            data: [],
            loading: true,
            failed: false,
            id:0,
            name:'',
            price:null,
            error: '',
            column: null,
            direction: null, 
        }
        
    }

    //API_URL = api.API_URL

    //Connect  to the server
    componentDidMount = ()=> {
        this._isMounted = true;
        this.populateData();       
    }

    //Update/display the table after modification
    componentDidUpdate = () => {
        this._isMounted = true;
        this.populateData();
    }

    //Unmont the component
    componentWillUnmount() {
        this._isMounted =false
    }

    // Fetch Data from the back-end
    populateData(){
        axios.get(this.API_URL + "/api/product").then(result => {

            if(this._isMounted){
                const response = result.data;
                this.setState({ data: response, loading: false, failed: false, error:""});
            }        
        })
        .catch(error => {
            this.setState({data: [], loading: false, failed: true, error:"Product data could not be loaded"});
        });
    }
    //Sorting -
    handleSort = (clickedColumn) => {
        const { data, direction } = this.state;

        this.setState({ direction: 'asc' });

        let copydata = [...data];

        const sortedlist = (direction === 'asc')
            ? _.orderBy(copydata, clickedColumn, 'asc')
            : _.orderBy(copydata, clickedColumn, 'desc')

        this.setState({ 
            data: sortedlist,
            direction: direction === 'asc'? 'desc' : 'asc',
            column:clickedColumn
        })
    }
   
    render(){
        const {direction} = this.state;
        let productList = this.state.data;

        //let content = [];
            
        if (productList && productList.length > 0){
            var content = productList.map(sto => (
                <tr key={sto.id}>
                    <td>{sto.name}</td>
                    <td>{sto.price}</td>
                    <td> <Edit id={sto.id} name={sto.name} price={sto.price} API_URL={this.API_URL}/> </td>
                    <td> <Delete id={sto.id} API_URL={this.API_URL}/></td>
                </tr>
             ))
        } 
        
          return (
            <React.Fragment>

                  <Create API_URL={this.API_URL}/>
               
                {/* Table to display all data */}                 
                <Table className= 'sortable celled fixed'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell 
                                  className='sorted ascending'
                                 sorted={direction==='asc'? 'ascending': 'descending'}
                                 onClick={()=>this.handleSort('name')}                            
                              > Name  
                            </Table.HeaderCell>
                            <Table.HeaderCell 
                                className=''
                                sorted={direction ==='asc'? 'ascending': 'descending'}
                                onClick={()=>this.handleSort('price')}                               
                              >Price
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