import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export class Create extends Component
{
    //_isMounted = false;
    constructor(props){
        super(props);
        
        this.state = {
            loading: this.props,
            failed: false,
            id:0,
            name: '',
            date: null,
            customer: '',
            customerData: this.props.customerData,
            product: '',
            productData: this.props.productData,
            store: '',
            storeData: this.props.storeData,
            dateSold: null,
            createshowModal: false,
        }   
    }

    //componentDidMount = () => {
    //    //this._isMounted = true;
    //    this.getcustomerdata();
    //    this.getstoredata();
    //    this.getproductdata();
    //}

    //componentWillUnmount() {
    //    this._isMounted = false;
    //}

    //Cancel operation
    onCancel = (e) => {
        this.setState({ createshowModal: false, id: 0, customer: '', product: '', store: '', dateSold: null })
    }


    // Create new data
    onCreate = (e) => {
        e.preventDefault();
        this.setState({ createshowModal: false, customer: '', product: '', store: '', dateSold: null })

        let storeObject = {
            DateSold: this.state.dateSold,
            CustomerId: this.state.customer,
            ProductId: this.state.product,
            StoreId: this.state.store,
        }

        axios.post("/api/sales/postsales", storeObject)
            .catch(error => console.log(error))
    }
    ////for options customer data
    //getCustomerData = () => {
    //    axios.get("api/customer")
    //        .then(result => {
    //            if (this._isMounted) {
    //                let response = result.data
    //                    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    //                    .map(res => { return { key: res.id, value: res.id, text: res.name } })

    //                this.setState({
    //                    customerData: [{ value: '', display: '!!' }].concat(response),
    //                    failed: false, error: "",
    //                    loading: false,
    //                });
    //            }
    //        })
    //        .catch(error => {
    //            this.setState({ customerData: [], loading: false, failed: true, error: "Customer data could not be loaded" });
    //        });
    //}
    ////for options store data
    //getStoreData = () => {
    //    axios.get("api/store").then(result => {
    //        if (this._isMounted) {
    //            let response = result.data
    //                .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    //                .map(res => { return { key: res.id, value: res.id, text: res.name } })

    //            this.setState({
    //                storeData: [{ value: '', display: '!!' }].concat(response),
    //                loading: false,
    //                failed: false,
    //                error: ""
    //            });
    //        }
    //    })
    //        .catch(error => {
    //            this.setState({ storeData: [], loading: false, failed: true, error: "Store data could not be loaded" });
    //        });
    //}

    ////for options product data
    //getProductData = () => {
    //    axios.get("api/product").then(result => {
    //        if (this._isMounted) {
    //            const response = result.data
    //                .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    //                .map(res => { return { key: res.id, value: res.id, text: res.name } })

    //            this.setState({
    //                productData: [{ value: '', display: '!!' }].concat(response),
    //                loading: false,
    //                failed: false,
    //                error: ""
    //            });
    //        }
    //    })
    //        .catch(error => {
    //            this.setState({ productData: [], loading: false, failed: true, error: "Product data could not be loaded" });
    //        });
    //}

    render(){
        const { createshowModal, dateSold, customer, product, store, customerData, productData, storeData  } = this.state;
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
                              <Form.Input className="dateInput" label="Date" type="date" name="date" value={dateSold || ""} placeholder={dateSold} onChange={(event, { name, value }) => this.setState({ dateSold: value })}></Form.Input>
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