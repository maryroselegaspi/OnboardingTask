import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export class Create extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            name: '',
            address: '',
            modalOpen: true,
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
            
        });
    }

    onChangeAddress(e){
        this.setState({
            address: e.target.value
        });
    }
    onCancel(e){
       
        const {history} = this.props;
        history.push('/store/store');
        this.setState({modalOpen:false});
    }

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;

        let customerObject = {
            name: this.state.name,
            address: this.state.address,      
        }

        let res = "/api/customer/postcustomer";
        axios.post(res, customerObject)
            .then(result => {
                history.push('/customer/customer');
        })
 
            .then(console.log({customerObject}));

    }

    render(){
        const {name, address} = this.state;
        const {onCancel, onSubmit, onChangeName, onChangeAddress} = this;
        return (
            <div>
               
                    <Header content="Add Customer" />
                    <Modal.Content>
                        <Form >
                            <Form.Input fluid label="Name" value={name} onChange={onChangeName}></Form.Input>
                            <Form.Input fluid label="Address"  value={address} onChange={onChangeAddress}></Form.Input>
                            
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={onCancel}>cancel</Button>
                        <Button color="green" onClick={onSubmit}> <i className="icon check" />Create</Button>
                    </Modal.Actions>
                
            </div>
         
          
        )
    }  
}

