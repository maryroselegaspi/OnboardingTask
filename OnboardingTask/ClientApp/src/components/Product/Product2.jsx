import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";



export class Product extends Component
{
    constructor(props){
        super(props);

        this.onProductCreate = this.onProductCreate.bind(this);
        this.onProductUpdate = this.onProductUpdate.bind(this);
        this.onProductDelete = this.onProductDelete.bind(this);

        this.state = {
            product: [],
            loading: true,
            failed: false,
            error: '',


        }

    }

    componentDidMount(){
        this.populateProductData();
    }

    onProductCreate(){
   const {history} = this.props;
        history.push('/product/create/');
   
    }

    onProductUpdate(id){
        const {history} = this.props;
        history.push('/product/update/'+id);
    }

    onProductDelete(id){
        const {history} = this.props;
        history.push('/product/delete/'+id);
    }


    populateProductData(){
        axios.get("api/product").then(result => {
            const response = result.data;
            this.setState({product: response, loading: true, failed: false, error:""});
        })
        // .catch(error => {
        //     this.setState({product: [], loading: false, failed: true, error:"Product data could not be loaded"});
        // })
        ;

    }
   
    //ALL CUSTOMER DETAILS
    renderAllProductTable(product){
        return (
            <div>
                
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map(prod => (
                        <tr key={prod.Id}>
                            <td>{prod.name}</td>
                            <td>{prod.price}</td>
                            <td>
                                <div className="form-group">
                                    <button className="ui yellow button" onClick={() => this.onProductUpdate(prod.id)}>
                                        <i className="icon edit"></i> EDIT
                                    </button>
                                    
                                </div>
                            </td>
                            <td>
                                <div className="form-group">
                                    <button className="ui red button" onClick={() => this.onProductDelete(prod.id)} >
                                            <i className="icon trash alternate"></i> DELETE
                                    </button>


                                </div>
                            

                            </td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
            </div>
         
        );
    }

    render(){

        let content = this.state.loading 
        ? ( this.renderAllProductTable(this.state.product))
        :  ( <p> <em>Loading...</em></p>) 

       /*  let content = this.state.loading 
        ? ( <p> <em>Loading...</em></p>) 
        : ( this.renderAllProductTable(this.state.product)) */
         
        

        return (
            <div> 
             {/*Activate Create Customer Modal*/} 
             <Modal as={Form}  
                trigger={<Button color="green" onClick={() => this.onProductCreate()}>New Product</Button>}  
                size="small" >
              </Modal>
                 {/* All customer Details Data */}
                <div>
                        {content}
                </div>
           
            </div>
        );
    }
}