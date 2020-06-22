import React, {Component} from 'react';
import axios from 'axios';

export class ProductUpdate extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onUpdateCancel = this.onUpdateCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            address: '',
            //dateStarted: null,
            //dateCompleted: null
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;

        axios.get("/api/product/" + id).then(trip => {
            const response = trip.data;

            this.setState({
                name: response.name,
                address: response.address,
                //dateStarted: new Date(response.dateStarted).toISOString().slice(0,10),
                //dateCompleted: response.dateCompleted ? new Date(response.dateCompleted).toISOString().slice(0,10) : null
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
        history.push('/product/product');
    }

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;
        const {id} = this.props.match.params;

        let tripObject = {
            name: this.state.name,
            address: this.state.address,
     }

        axios.put("api/product/putproduct/"+id, tripObject).then(result => {
            history.push('/product/product');
        })

    }

    render(){
        return (
            <div className="trip-form" >
                <h3>Edit customer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product name:  </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={this.state.name}
                          onChange={this.onChangeName}
                         />
                    </div>
                    <div className="form-group">
                        <label>Product Price: </label>
                        <textarea 
			  type="text" 
                          className="form-control"
                          value={this.state.address}
                          onChange={this.onChangeAddress}
                        />
                    </div>                    
                    <div className="form-group">
                        <button onClick={this.onUpdateCancel} className="btn btn-default">Cancel</button>
                        <button type="submit" className="btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        )
    }
}