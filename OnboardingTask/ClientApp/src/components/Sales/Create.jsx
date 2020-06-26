import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
//import Api from '../Api'

export class Create extends Component
{
   // API_URL = "https://mvpreactshop.azurewebsites.net";
    _isMounted = false;
    constructor(props){
        super(props);
        
        this.state = {
            loading: true,
            failed: false,
            id:0,
            name: '',
            date: null,
            customer: '', 
            product: '',
            store: '',
            dateSold: null,
            createshowModal: false,
            customerData: [],//this.props.customerData,
            productData: [], //this.props.productData,
            storeData: [], //this.props.storeData,

        }   
        //this.API_URL = new Api();
    }

    //Connect  to the server
    componentDidMount = () => {
        this._isMounted = true;
        this.getCustomerData();
        this.getStoreData();
        this.getProductData();

    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    //for options customer data
    getCustomerData = () => {
        axios.get(this.props.API_URL + "api/customer")
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
        axios.get(this.props.API_URL + "api/store").then(result => {
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
        axios.get(this.props.API_URL + "api/product").then(result => {
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
        this.setState({ createshowModal: false, id: 0, customer: '', product: '', store: '', dateSold: null })
    }

    // Create new data
    onCreate = (e) => {
        e.preventDefault();
        this.setState({ createshowModal: false, customer: '', product: '', store: '', dateSold: null })

        let storeObject = {
            Datesold: this.state.dateSold,
            CustomerId: this.state.customer,
            ProductId: this.state.product,
            StoreId: this.state.store,
        }
        //alert("dates added to server: ",storeObject.Datesold)
        axios.post(this.props.API_URL + "api/sales/postsales", storeObject)
            .catch(error => console.log(error))
    }
 

    render(){
        const { createshowModal, customer, product, store, dateSold, customerData, productData, storeData } = this.state;
            const { onCreate, onCancel } = this;
          return (
             <div>

                  {/* Create Modal */}
                  <Modal size="small"
                      onClose={this.createshowModal} open={createshowModal}
                      trigger={<Button color="blue" onClick={() => this.setState({ createshowModal: true })}>New Sales</Button>}   >
                      <Header content="Create Sales" />
                      <Modal.Content>
                          <Form >
                              <Form.Input className="dateInput" label="Date" type="date" name="date" value={dateSold ||''} placeholder={'Select Date'} onChange={(event, { name, value }) => this.setState({ dateSold: value })}></Form.Input>
                              <Form.Select label="Customer" placeholder={"Select Customer"} value={customer} options={customerData} onChange={(event, { name, value }) => this.setState({ customer: value })} />
                              <Form.Select label="Product" placeholder={"Select Product"} value={product} options={productData} onChange={(event, { name, value }) => this.setState({ product: value })} />
                              <Form.Select label="Store" placeholder={"Select Store"} value={store} options={storeData} onChange={(event, { name, value }) => this.setState({ store: value })} />
                          </Form>
                      </Modal.Content>
                      <Modal.Actions>
                          <Button color="black" onClick={() => onCancel()}>cancel</Button>
                          <Button color="green" onClick={(e) => onCreate(e)}> create   <i className=" icon check" /></Button>
                      </Modal.Actions>
                  </Modal>

                
            </div>
        );
    }
}