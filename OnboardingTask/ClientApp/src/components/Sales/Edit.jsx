import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
//import { DateInput } from 'semantic-ui-calendar-react';
import moment from 'moment/moment.js';
//import Api from '../Api'

export class Edit extends Component
{
   // API_URL = "https://mvpreactshop.azurewebsites.net";
    _isMounted = false;
    constructor(props){
        super(props);
        
        this.state = {
            failed: false,
            id:this.props.id,
            //name: this.props.name,
            address: this.props.address,
            customer: this.props.customer,
            product: this.props.product,
            store: this.props.store,
            datesold: this.props.datesold,
            customerData: [],
            productData: [], 
            storeData: [], 
            editshowModal: false,  
            loading: true,
            name: '',
            //id: 0,
            error:'',
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
        axios.get(this.props.API_URL + "api/customer/")
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
        axios.get(this.props.API_URL + "/api/store/").then(result => {
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
        axios.get(this.props.API_URL + "/api/product/").then(result => {
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
            id: this.props.id,
            customer: this.props.customer,
            product: this.props.product,
            store: this.props.store,
            datesold: this.props.datesold
        })
    }


    // Edit data
    onUpdate = (id) => {
        let object = {
            Datesold: moment(this.state.datesold, "DD-MM-YYYY").format("MM-DD-YYYYY"),
            CustomerId: this.state.customer,
            ProductId: this.state.product,
            StoreId: this.state.store
        }
        console.log(this.state.datesold)

        axios.put(this.props.API_URL + "/api/sales/putsales/" + id, object)
           .then(response => alert(response.data))
          .catch(error => alert(error))
          .then(this.setState({ editshowModal: false}));
    }

    render() {
        
        const { editshowModal, id, customer, product, store, datesold, customerData, productData, storeData } = this.state;
            const { onUpdate, onCancel } = this;
          return (
             <div>
                  {/* Edit modal  */}
                  <Modal size="small"
                      onClose={() => this.editshowModal} open={editshowModal}
                      trigger={<Button color="yellow" onClick={() => this.setState({ editshowModal: true })}><Icon className='edit' /> EDIT</Button>}   >
                      <Header content="Edit Sales" />
                      <Modal.Content>
                          <Form >
                              <Form.Input className="dateInput" label="Date" name='date' placeholder="Select Date" value={datesold} onChange={(event, { name, value }) => this.setState({ datesold: value })}></Form.Input>
                              <Form.Select label="Customer" placeholder="Select Customer" value={customer} options={customerData} onChange={(event, { name, value }) => this.setState({ customer: value })} />
                              <Form.Select label="Product" placeholder="Select Product" value={product} options={productData} onChange={(event, { name, value }) => this.setState({ product: value })} />
                              <Form.Select label="Store" placeholder="Select Store" value={store} options={storeData} onChange={(event, { name, value }) => this.setState({ store: value })} />
                          </Form>
                      </Modal.Content>
                      <Modal.Actions>
                          <Button color="black" onClick={() => onCancel()}>cancel</Button>
                          <Button color="green" onClick={() => onUpdate(id)}> <i className="icon check" />edit</Button>
                      </Modal.Actions>
                  </Modal>
            </div>
        );
    }
}