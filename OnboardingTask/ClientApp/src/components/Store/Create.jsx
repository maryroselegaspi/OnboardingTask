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
            address: '',
            createshowModal: false,  
        }   
       //this.API_URL = new Api();
    }
    
    // This will handle the input area to reflect the user's input value
    onChangeName = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }

    onChangeAddress = (e) => {
        e.preventDefault();
        this.setState({ address: e.target.value });
    }

    //Cancel the operation
    onCancel = (e) => { 
        this.setState({ createshowModal:false, name:'', address:''})
    }

    //Add new data
    onCreate = (e) => {
        e.preventDefault();
        this.setState({ createshowModal: false, name: '', address: '' })

        let storeObject = {
            Name: this.state.name,
            Address: this.state.address,
        }
        axios.post(this.props.API_URL + "/api/store/poststore", storeObject)
    }
    render(){
        const { createshowModal, name, address } = this.state;
            const { onChangeName, onChangeAddress, onCreate, onCancel } = this;
          return (
             <div>
                  {/* Create New Store Modal */}
                  <Modal size="small"
                      onClose={this.createshowModal} open={createshowModal}
                      trigger={<Button color="blue" onClick={() => this.setState({ createshowModal: true })}>New Store</Button>}   >
                      <Header content="Create Store" />
                      <Modal.Content>
                          <Form >
                              <Form.Input label="NAME" placeholder='Name' required value={name} onChange={(e) => onChangeName(e)}></Form.Input>
                              <Form.Input label="ADDRESS" placeholder='Address' required value={address} onChange={(e) => onChangeAddress(e)}></Form.Input>
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