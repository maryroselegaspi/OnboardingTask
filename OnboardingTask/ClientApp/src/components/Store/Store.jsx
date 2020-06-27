import React, {Component} from 'react';
import axios from 'axios';
import { Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from 'lodash';
import { Edit } from './Edit';
import { Delete } from './Delete';
import { Create } from './Create';
import { api } from '../Api'


export class Store extends Component
{
    //API_URL = "https://mvpreactshop.azurewebsites.net";
    _isMounted = false;
    API_URL = api.API_URL;

    constructor(props){
        super(props);

        this.state = {
            store: [],
            loading: true,
            failed: false,
            id:0,
            name:'',
            address:'',
            error: '',
            column: null,
            direction: null, 
        }
        //this.API_URL = new Api();
    }
    //API_URL = api.API_URL;
    //Connect  to the server
    componentDidMount = ()=> {
        this._isMounted = true;
        this.populateStoreData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    //Update/display the table after modification
    componentDidUpdate = () => {
        this._isMounted = true;
        this.populateStoreData();
    }
  
    // Fetch Data from the back-end
    populateStoreData(){
        axios.get(this.API_URL+"api/store/")
            .then(result => {

                if(this._isMounted){
                    const response = result.data;
                    this.setState({store: response.json(), loading: false, failed: false, error:""});
                }
            })
            .catch(error => {
            this.setState({store: [], loading: false, failed: true, error:"Store data could not be loaded"});
            });
    }
    //Sorting -- 
    handleSort = (clickedColumn) => {
        const { store, direction } = this.state

        this.setState({direction:'asc'})

        let copydata = [...store];

        const sortedlist = ((direction === 'asc')
            ? _.orderBy(copydata, clickedColumn, 'asc')
            : _.orderBy(copydata, clickedColumn, 'desc'));

        this.setState({ 
            store: sortedlist,
            direction: direction === 'asc'? 'desc' : 'asc',
            column:clickedColumn,
        })
    }
   
    render(){
        let storeList = this.state.store;
        //let content = null;
            
        if(storeList && storeList.length > 0){
            var content = storeList.map(sto => (
                <tr key={sto.id}>
                    <td>{sto.name}</td>
                    <td>{sto.address}</td>
                    <td> <Edit id={sto.id} name={sto.name} address={sto.address} API_URL={this.API_URL}/> </td>
                    <td> <Delete id={sto.id} API_URL={this.API_URL}/> </td>
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
                                 sorted={this.state.direction==='asc'? 'ascending': 'descending'}
                                 onClick={()=>this.handleSort('name')}                            
                              > Name  
                            </Table.HeaderCell>
                            <Table.HeaderCell 
                                className=''
                                sorted={this.state.direction ==='asc'? 'ascending': 'descending'}
                                onClick={()=>this.handleSort('address')}                               
                              >Address
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