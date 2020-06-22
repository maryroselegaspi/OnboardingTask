import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export class StoreCreate extends Component{
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

        let res = "/api/store/poststore";
        axios.post(res, customerObject)
            .then(result => {
                history.push('/store/store');
        })
 
            .then(console.log({customerObject}));

    }

    render(){
        return (
            <div>
               
                    <Header content="Add Store" />
                    <Modal.Content>
                        <Form >
                            <Form.Input fluid label="Name" value={this.state.name} onChange={this.onChangeName}></Form.Input>
                            <Form.Input fluid label="Address"  value={this.state.address} onChange={this.onChangeAddress}></Form.Input>
                            
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={this.onCancel}>cancel</Button>
                        <Button color="green" onClick={this.onSubmit}> <i className="icon check" />Create</Button>
                    </Modal.Actions>
                
            </div>
         
          
        )
    }  
}

