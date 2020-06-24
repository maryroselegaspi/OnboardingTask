import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
//import Api from '../Api'


export class Edit extends Component
{
    //API_URL = "https://mvpreactshop.azurewebsites.net";
    constructor(props){
        super(props);
        
        this.state = {
            failed: false,
            id:this.props.id,
            name: this.props.name,
            address: this.props.address,
            editshowModal: false,  
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
        this.setState({editshowModal:false, name:this.props.name, address:this.props.address})
    }
    // Edit data
    onUpdate = (id) => {
        let object = {
            Name: this.state.name,
            Address: this.state.address,
        }

        axios.put(this.props.API_URL+"/api/store/putstore/" + id, object)
        this.setState({ editshowModal: false });
    }

    render(){
            const {editshowModal, name, address, id } = this.state;
            const { onChangeName, onChangeAddress, onUpdate, onCancel } = this;
          return (
             <div>   
                  {/* Edit modal */}
                  <Modal size="small"
                      onClose={() => this.editshowModal()} open={editshowModal}
                      trigger={<Button color="yellow" onClick={() => this.setState({ editshowModal: true })}><Icon className='edit' /> EDIT</Button>}   >
                      <Header content="Edit Store" />
                      <Modal.Content>
                          <Form >
                              <Form.Input label="Name" value={name} onChange={onChangeName}></Form.Input>
                              <Form.TextArea label="Address" value={address} onChange={onChangeAddress}></Form.TextArea>
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