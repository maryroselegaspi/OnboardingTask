import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header } from "semantic-ui-react";
import "../Sales/node_modules/semantic-ui-css/semantic.min.css";

export class Create extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onCancel = this.onCancel.bind(this);

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
        history.push('/customer/customer');
        this.setState({modalOpen:false});
    }

    onSubmit(e){
        e.preventDefault();

        let customerObject = {
            Name: this.state.name,
            Address: this.state.address,
            
        }
        alert('New customer was submitted:  ${customerObject}' );
        
       
        const {history} = this.props;
        axios.post("/Customer/CreateCustomer", {customerObject})
            .then(result => {history.push('/customer/customer');
        })

        let res = axios.post("/Customer/CreateCustomer");

        console.log('Status: ${res.status}');
        console.log('Status: ${res.statusTextt}');
        console.log('Status: ${res.status.request.method}');

        this.setState({modalOpen:false});

    }

    render(){
        return (
            <div>
               
                    <Header content="Create Customer" />
                    <Modal.Content>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Input fluid label="Name" name="name" value={this.state.name}onChange={this.onChangeName}></Form.Input>
                            <Form.Input fluid label="Address" name="address" value={this.state.address}onChange={this.onChangeAddress}></Form.Input>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={this.onCancel}>cancel</Button>
                        <Button color="green" onClick={this.onSubmit}> <i class="icon check" />Create</Button>
                    </Modal.Actions>
                
            </div>
         
          
        )
    }  
}

