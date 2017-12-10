import React, { Component } from 'react';
import FoodTrucks from './FoodTrucks';

export default class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

	render() {
		return (
      <div>
        <div className="page-header text-center">
          <h2>Food Truck Admin Dashboard</h2>
        </div>
        <div className="row text-center">
          <FoodTrucks {...this.props}/>
        </div>
      </div>
		);
	}
}
