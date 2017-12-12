import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// Our application route
import App from './App';
import AdminLogin from './AdminLogin';

const appRoutes = [
	{
		exact: 'exact',
		path: '/',
		component: AdminLogin
	},
  {
    path: '/food-trucks',
    component: App
  }
];

class Root extends Component {
    
    routes = () => {
        const paths = []
        appRoutes.map((item, index) => {
            const exact = item.exact ? item.exact : ''
            paths.push(
              <Route 
                exact 
                path={item.path} 
                component={item.component} 
                key={index}
                {...this.props} 
              />
            )
        })
        return paths
    }

    render() {
        return(
            <div>
                {this.routes()}
            </div>
        )
    }
}

// Render App to DOM
render(
	<BrowserRouter>
		<div>
		 <Root />
		</div>
	</BrowserRouter>, 
	document.getElementById('food-truck-dash')
);
