import React, { Component } from 'react';

export default class CreateForm extends Component {
    render(){
        return(
            <form onSubmit={this.props.onSubmit} className="form col-md-4 col-md-offset-4 well">
                <div className="form-group">
                    <h4>Add new truck:</h4>
                    <input 
                        className="form-control"
                        placeholder="enter truck name" 
                        type="text" 
                        onChange={this.props.onChange}
                        value={this.props.value}
                    />
                </div>
                <button className="btn btn-success btn-block" type="submit">Add</button>
            </form>
        )
    }
}