import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import adminUserData from './adminUserData.json';

export default class AdminLogin extends Component {

  constructor(props){
    super(props);
    this.state = {
      admin_users : [],
      user: '',
      pass: '',
      isAdmin: false,
      error: '',
      loading: false,
      redirect: false
    }
  }

  componentWillMount = () => {
    this.setState({ admin_users: adminUserData });
  }

  handleAdminLogin = (event, user, pass) => {
    event.preventDefault();
    const { admin_users, isAdmin } = this.state;
    const found_admin = [];
    admin_users.forEach((admin, index) => {
      if(admin.user_name === user && admin.pass_word === pass){
        found_admin.push(admin)
        this.setState({ isAdmin: true, error: '', user: '', pass: '', loading: true });
        this.loginAdmin(
          'Checking user in Admin Database...',
          'Found user in Admin Database!... Logging in user now...',
          '/food-trucks'
        );
      }
    });
    if(found_admin.length < 1){
      this.setState({ user: '', pass: '' })
      let errorColor = { background: '#D75452', text: "#FFFFFF" };
       notify.show('Must have admin permissions to use this app!', 'custom', 3000, errorColor);
    }
  }

  loginAdmin = (message1, message2, redirectPath) => {
    let adminSuccess = { background: '#5FB760', text: "#FFFFFF" };
    notify.show(message1, 'custom', 4000, adminSuccess);
    setTimeout(() => {
      notify.show(message2,'custom', 4000, adminSuccess)
    }, 4400);
    setTimeout(() => this.props.history.push(redirectPath, {user_type: {admin: true}}), 9000);
  }

  render(){
    console.log('this.state',this.state);
    console.log('this.props',this.props);
    if(this.state.loading){
      return(
        <div className="container-fluid">
          <div className="row">
            <Notifications />
          </div>
        </div>
      )
    }else{
      return(
        <div className="container-fluid">
          <div className="row text-center">
            <Notifications />
              <form 
                onSubmit={
                  event => {
                    this.handleAdminLogin(event, this.state.user, this.state.pass)
                  }
                } 
                className="form col-md-4 col-md-offset-4 well"
                style={{marginTop: '25%'}}
              >
            <div className="form-group">
                <h4>Food Truck Dashboard Admin Login</h4>
                <input 
                    className="form-control"
                    placeholder="enter username" 
                    type="text" 
                    onChange={
                      event => {
                        this.setState({ user: event.target.value, error: '' }) 
                      }
                    }
                    value={this.state.user}
                />
            </div>
            <div className="form-group">
              <input 
                className="form-control"
                placeholder="enter password" 
                type="password" 
                onChange={
                  event => {
                    this.setState({ pass: event.target.value, error: ''}) 
                  }
                }
                value={this.state.pass}
                />
            </div>
            <p style={{color: 'red'}}>{this.state.error}</p>
            <button className="btn btn-success btn-block" type="submit">Login</button>
           </form>
          </div>
        </div>
      )
    }
  }
}