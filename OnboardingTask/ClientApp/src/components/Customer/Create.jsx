import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Table, Form, Button, Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import _ from 'lodash'


export class Customer extends Component
{
    _isMounted = false;
    constructor(props){
        super(props);
        

        this.state = {
            customer: [],
            loading: true,
            failed: false,
            id:0,
            name:'',
            address:'',
            createshowModal: false,
            error: '',
            column: null,
            direction: null, // should always be null

        }
    }
    
    //Connect  to the server
    componentDidMount = (props)=> {
       // props._isUnsubscribeAPi = true;
        this._isMounted =true
        this.populateCustomerData();
    }
    componentWillUnmount() {
        this._isMounted =false
    }

    // This will handle the input area to reflect the user's input value
    onChangeName = (e) => this.setState({name: e.target.value }); 

    onChangeAddress = (e) => { this.setState({ address: e.target.value});}

    //Cancel the operation
    onCancel = (e) => { 
        this.setState({createshowModal:false, id:0, name:'', address:''})
    }

    onCreateModalClose = () => this.setState({createshowModal:false})

    //Add new data
    onCreate=(e)=>{
        e.preventDefault();
        this.setState({createshowModal:false, name:'', address:''})

        let customerObject = { 
            Name: this.state.name,
            Address: this.state.address,      
        }
    
        axios.post("/api/customer/postcustomer", customerObject)      
        this.componentDidUpdate();
        //console.log(customerObject);
    }
  

    render(){
        const { direction, name, address, createshowModal } = this.state;
        const { onChangeName, onChangeAddress, onCancel, onCreate} = this;

          return (
            <React.Fragment>
               {/* Create New customer Modal */}
                <Modal size="small"   
                        onClose={this.createshowModal} open={createshowModal} 
                        trigger={<Button color="blue" onClick={() => this.setState({createshowModal:true})}>New Customer</Button>}   >
                        <Header content="Create Customer" />                    
                        <Modal.Content>
                            <Form >
                                <Form.Input  label="NAME" placeholder ='Name' value={name} onChange={(e) => onChangeName(e)}></Form.Input>
                                <Form.Input  label="ADDRESS" placeholder ='Address' value={address} onChange={(e)=> onChangeAddress(e)}></Form.Input>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="black" onClick={() => onCancel()}>cancel</Button>
                            <Button color="green" onClick={(e)=> onCreate(e)}> Create   <i className=" icon check" /></Button>
                        </Modal.Actions>                   
                </Modal>

            </React.Fragment>
        );
    }
}