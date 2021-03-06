import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Button, Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
//import Api from '../Api'

export class Delete extends Component
{
    //API_URL = "https://mvpreactshop.azurewebsites.net";
    constructor(props){
        super(props);
        
        this.state = {
            failed: false,
            id:this.props.id,
            deleteshowModal: false,  
        }   
        //this.API_URL = new Api();
    }
   
    //Cancel the operation
    onCancel = (e) => { 
        this.setState({ deleteshowModal:false,})
    }

    //Delete Data
    onDeleteConfirmation = (id) => {
        axios.delete(this.props.API_URL + "api/customer/deletecustomer/" + id)
        this.setState({ deleteshowModal: false});
    }

    render(){
        const { deleteshowModal, id } = this.state;
        const {  onDeleteConfirmation, onCancel } = this;
          return (
             <div>
                  {/* Delete modal */}
                  <Modal size="small"
                      onClose={this.deleteshowModal} open={deleteshowModal}
                      trigger={<Button color="red" onClick={() => this.setState({ deleteshowModal: true})}><Icon className='trash alternate' /> DELETE</Button>}   >
                      <Header content="Delete customer" />
                      <Modal.Content>
                          <h4> Are you sure?</h4>
                      </Modal.Content>
                      <Modal.Actions>
                          <Button color="black" onClick={() => onCancel()}>cancel</Button>
                          <Button color="red" onClick={() => onDeleteConfirmation(id)}> <i className="icon delete" />delete</Button>
                      </Modal.Actions>
                  </Modal>      
            </div>
        );
    }
}