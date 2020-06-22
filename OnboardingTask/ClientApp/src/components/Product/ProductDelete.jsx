import React, {Component} from 'react';
import axios from'axios';

export class ProductDelete extends Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onConfirmation = this.onConfirmation.bind(this);

        this.state = {
            name: "",
            price: 0,
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;

        axios.get("/api/product/" + id)
            .then(customer => {
                const response = customer.data;

            this.setState({
                name: response.name,
                price: response.price,
            })
        })
    }

    onCancel(e){
        const {history} = this.props;
        history.push('/product/product');
    }

    onConfirmation(e){
        const {id} = this.props.match.params;
        const {history} = this.props;

        axios.delete("/api/product/deleteproduct/" + id)
            .then(result => {
                history.push('/product/product');
        })
    }

    render(){
        return (
            <div style={{ marginTop: 10 }}>
            <h2>Delete product record confirmation</h2>
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title"> {this.state.name} </h4>
                    <p class="card-text"> {this.state.price} </p>
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