import React, {Component} from 'react';
import axios from'axios';

export class StoreDelete extends Component{
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

        axios.get("/api/store/"+ id).then(result => {
            const response = result.data;

            this.setState({
                name: response.name,
                address: response.address,
                //dateStarted: new Date(response.dateStarted).toISOString().slice(0,10),
                //dateCompleted: response.dateCompleted ? new Date(response.dateCompleted).toISOString().slice(0,10) : null
            })
        })
    }
    onCancel(e){
        const {history} = this.props;
        history.push('/store/store');
    }

    onConfirmation(e){
        const {id} = this.props.match.params;
        const {history} = this.props;

        axios.delete("/api/store/deletestore/" + id)
            .then(result => {
                history.push('/store/store');
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