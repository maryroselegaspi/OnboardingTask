import React, {Component} from 'react';
import axios from'axios';

export class Delete extends Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onConfirmation = this.onConfirmation.bind(this);

        this.state = {
            name: "",
            address:"",
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;

        axios.get("/api/customer/" + id).then(customer => {
            const response = customer.data;

            this.setState({
                name: response.name,
                address: response.address,
            })
        })
    }

    onCancel(e){
        const {history} = this.props;
        history.push('/customer/customer');
    }

    onConfirmation(e){
        const {id} = this.props.match.params;
        const {history} = this.props;

        axios.delete("/api/customer/deletecustomer/"+ id)
            .then(result => {
                history.push('/customer/customer');
        })
    }

    render(){
        return (
            <div style={{ marginTop: 10 }}>
            <h2>Delete customer record confirmation</h2>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title"> {this.state.name} </h4>
                    <p class="card-text"> {this.state.address} </p>
                    <button onClick={this.onCancel} class="btn btn-default">
                    Cancel
                    </button>
                    <button onClick={(id)=>this.onConfirmation(this.state.id)} class="btn btn-danger">
                    Confirm
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}