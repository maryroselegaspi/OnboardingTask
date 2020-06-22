import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export class ProductCreate extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            name: '',
            price: 0,
            modalOpen: true,
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
            
        });
    }

    onChangePrice(e){
        this.setState({
            price: e.target.value
        });
    }
    onCancel(e){
       
        const {history} = this.props;
        history.push('/product/product');
        this.setState({modalOpen:false});
    }

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;

        let customerObject = {
            name: this.state.name,
            price: this.state.price,
            
        }

        let res = "/api/product/postproduct";
        axios.post(res, customerObject)
            .then(result => {
                history.push('/product/product');
            })
            
            .then(console.log({customerObject}))
        ;
       
    }

    render(){
        return (
            <div>
               
                    <Header content="Add Product" />
                    <Modal.Content>
                        <Form >
                            <Form.Input fluid label="Name" value={this.state.name} onChange={this.onChangeName}></Form.Input>
                        <Form.Input fluid label="Price" type="number"  value={this.state.price} onChange={this.onChangePrice}></Form.Input>
                            
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

