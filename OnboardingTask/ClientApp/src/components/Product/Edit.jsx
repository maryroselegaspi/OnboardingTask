import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export class Edit extends Component
{
    constructor(props){
        super(props);
        
        this.state = {
            failed: false,
            id:this.props.id,
            name: this.props.name,
            price: this.props.price,
            editshowModal: false,  
        }   
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
        this.setState({editshowModal: false, id: this.props.id, name: this.props.name, price: this.props.price })
    }

    // Edit data
    onUpdate = (id) => {
        let object = {
            Name: this.state.name,
            Price: parseFloat(this.state.price),
        }

        axios.put("api/product/putproduct/" + id, object)
        this.setState({ editshowModal: false});

    }

    render(){
            const {editshowModal, name, price, id } = this.state;
            const { onChangeName, onChangePrice, onUpdate, onCancel } = this;
          return (
             <div>
                  {/* Edit modal */}
                  <Modal size="small"
                      onClose={() => this.editshowModal()} open={editshowModal}
                      trigger={<Button color="yellow" onClick={() => this.setState({ editshowModal: true})}><Icon className='edit' /> EDIT</Button>}   >
                      <Header content="Edit Product" />
                      <Modal.Content>
                          <Form >
                              <Form.Input label="Name" value={name} onChange={onChangeName}></Form.Input>
                              <Form.Input label="Price" value={price} onChange={onChangePrice}></Form.Input>
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