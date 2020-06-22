import React, {Component} from 'react';
import axios from 'axios';

export class StoreUpdate extends Component{
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

    //onChangeDateStarted(e){
      //  this.setState({
       //     dateStarted: e.target.value
      //  });
  //  }

    //onChangeDateCompleted(e){
   //     this.setState({
   //         dateCompleted: e.target.value
   //     });
   // }

    onUpdateCancel(){
        const {history} = this.props;
        history.push('/store/store');
    }

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;
        const {id} = this.props.match.params;

        let storeObject = {
            name: this.state.name,
            address: this.state.address,
           // dateStarted: new Date(this.state.dateStarted).toISOString(),
           // dateCompleted: this.state.dateCompleted ? new Date(this.state.dateCompleted).toISOString() : null
        }

        axios.put("api/store/putstore/"+ id, storeObject)
            .then(result => {
                history.push('/store/store');
        })

    }

    render(){
        return (
            <div className="trip-form" >
                <h3>Edit Store</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Store name:  </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={this.state.name}
                          onChange={this.onChangeName}
                         />
                    </div>
                    <div className="form-group">
                        <label>Store Address: </label>
                        <textarea 
			  type="text" 
                          className="form-control"
                          value={this.state.address}
                          onChange={this.onChangeAddress}
                        />
                    </div>                    
                    <div className="form-group">
                        <button onClick={this.onUpdateCancel} className="btn btn-default">Cancel</button>
                        <button onClick={this.onSubmit} className="btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        )
    }
}