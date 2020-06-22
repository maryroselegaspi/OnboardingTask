import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Form, Button, Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export class Update extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onUpdateCancel = this.onUpdateCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            address: '',
            showModal: false,
        }
    }
    onModalOpen= () => this.setState ({showModal: true})
    onModalClose =()=> { this.setState ({showModal: false})}
    onChangeName = (e) => this.setState({name: e.target.value }); 
    onChangeAddress = (e) => { this.setState({ address: e.target.value});}
    onCancel = (e) => { 
        const {history} = this.props;
        this.onModalClose();
    }

    componentDidMount(){
        const {id} = this.props.match.params;

        axios.get("/api/customer/"+id).then(res => {
            const response = res.data;

            this.setState({
                name: response.name,
                address: response.address,
             })
        })
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

    onUpdateCancel(){
        const {history} = this.props;
        history.push('/customer/customer');
    }
    onCancel = (e) => { 
        const {history} = this.props;
        this.onModalClose();
    }
    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;
        const {id} = this.props.match.params;

        let custObject = {
            name: this.state.name,
            address: this.state.address,
           // dateStarted: new Date(this.state.dateStarted).toISOString(),
           // dateCompleted: this.state.dateCompleted ? new Date(this.state.dateCompleted).toISOString() : null
        }

        axios.put("api/customer/putcustomer/"+ id, custObject)
            //.then(result => {
              //  history.push('/customer/customer');
        //})
        this.onModalClose();

    }

    render(){
        const{name, address,showModal} = this.state;
        const{onModalClose, onChangeName, onChangeAddress, onCancel, onUpdate, onEditName, onEditAddress} = this;

        return (
            <div>
                {/* Create New customer Modal */}
                <Modal as={Form} 
                    onClose={onModalClose} 
                    open={showModal} 
                    size="lg"
                    //trigger={<Button color="yellow" onClick={this.onCustomerUpdate()}><Icon className='edit' /> EDIT</Button>}   >
                    >
                    <Header content="Edit Customer" />
                    <Modal.Content>
                        <Form >
                            <Form.Input fluid label="Name"  value={name} onChange={onChangeName}></Form.Input>
                            <Form.TextArea fluid label="Address"  value={address} onChange={onChangeAddress}></Form.TextArea>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={() => this.onCancel()}>cancel</Button>
                        <Button color="green" close={onCancel} onClick={() => this.onSubmit()}> <i className="icon check" />edit</Button>
                    </Modal.Actions>
                </Modal> 

            </div>
            
            // <div className="trip-form" >
            //     <h3>Edit customer</h3>
            //     <form onSubmit={this.onSubmit}>
            //         <div className="form-group">
            //             <label>Customer name:  </label>
            //             <input 
            //               type="text" 
            //               className="form-control" 
            //               value={this.state.name}
            //               onChange={this.onChangeName}
            //              />
            //         </div>
            //         <div className="form-group">
            //             <label>Customer Address: </label>
            //             <textarea 
			//   type="text" 
            //               className="form-control"
            //               value={this.state.address}
            //               onChange={this.onChangeAddress}
            //             />
            //         </div>                    
            //         <div className="form-group">
            //             <button onClick={this.onUpdateCancel} className="btn btn-default">Cancel</button>
            //             <button type="submit" className="btn btn-success">Update</button>
            //         </div>
            //     </form>
           // </div>
        )
    }
}