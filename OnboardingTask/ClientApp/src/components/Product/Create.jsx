import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

//import Api from '../Api'


export class Create extends Component
{
    //API_URL = "https://mvpreactshop.azurewebsites.net";
    constructor(props){
        super(props);
        
        this.state = {
            failed: false,
            id:0,
            name: '',
            price: null,
            createshowModal: false,  
        }   
        //this.API_URL = new Api();
    }
    
    // This will handle the input area to reflect the user's input value
    onChangeName = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value })
    };
    onChangePrice = (e) => {
        e.preventDefault();
        this.setState({ price: e.target.value });
    }

    //Cancel operation
    onCancel = (e) => {
        this.setState({ createshowModal: false,id: 0, name: '', price: null })
    }

    //Add new data
    onCreate = (e) => {
        e.preventDefault();
        this.setState({ createshowModal: false, name: '', price: null })

        let productObject = {
            Name: this.state.name,
            Price: parseFloat(this.state.price),
        }

        axios.post(this.props.API_URL + "/api/product/postproduct", productObject)

    }

    render(){
        const { createshowModal, name, price } = this.state;
        const { onChangeName, onChangePrice, onCreate, onCancel } = this;
          return (
             <div>
                  {/* Create New Product Modal */}
                  <Modal size="small"
                      onClose={this.createshowModal} open={createshowModal}
                      trigger={<Button color="blue" onClick={() => this.setState({ createshowModal: true })}>New Product</Button>}   >
                      <Header content="Create Product" />
                      <Modal.Content>
                          <Form >
                              <Form.Input label="NAME" value={name || ""} placeholder='Product name' onChange={(e) => onChangeName(e)}></Form.Input>
                              <Form.Input label="PRICE" value={price || ""} placeholder='10.00' onChange={(e) => onChangePrice(e)} ></Form.Input>
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