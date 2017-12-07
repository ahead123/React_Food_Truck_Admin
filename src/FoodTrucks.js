import React, { Component } from 'react';
import FoodTruckList from './FoodTruckList';
import truckData from './truckData.json';
import CreateForm from './CreateForm';
import EditForm from './EditForm';
import Notifications, { notify } from 'react-notify-toast';

export default class FoodTrucks extends Component {

    constructor(props){
        super(props);
        this.state = {
            food_trucks: [],
            name: '',
            edit: false,
            edit_truck: [],
            edit_truck_name: ''
        }
    }

    componentWillMount(){
        this.setState({
            food_trucks: truckData
        })
    }

    createTruck = (event) => {
        event.preventDefault();
        if(this.state.name!=''){
            let counter = this.state.food_trucks.length;
            counter=counter+1;       
            let newTruck = [...this.state.food_trucks, {'id': counter.toString(), 'name': this.state.name} ];
            this.setState({
                food_trucks: newTruck,
                name: ''
            });
            let addColor = { background: '#5FB760', text: "#FFFFFF" };
            notify.show('Food truck successfully added!', 'custom', 2000, addColor); 
        }else{
            let errorColor = { background: '#D75452', text: "#FFFFFF" };
            notify.show('Truck name can\'t be blank!', 'custom', 2000, errorColor)
        }
    }

    handleEdit = (event, truckID) => {
        event.preventDefault();
        let updateTruck = this.state.food_trucks.filter(truck => truck.id == truckID);
        this.setState({edit: true, edit_truck: updateTruck})
    }

    updateTruck = (event) => {
        event.preventDefault();
        let index = this.state.food_trucks.filter(truck => truck.id == this.state.edit_truck[0].id);
        let updatedRecord = { 'id':index.id,'name':this.state.edit_truck_name }
        let spliceTrucks = this.state.food_trucks.filter(truck => truck.id != this.state.edit_truck[0].id);
        this.setState({ 
            food_trucks: spliceTrucks.concat(updatedRecord),
            edit: false,
            edit_truck_name: ''
        });
        let updateColor = { background: '#5FB760', text: "#FFFFFF" };
        notify.show('Food truck successfully updated!', 'custom', 2000, updateColor); 
    }

    confirmRemove = (event, truckID) => {
        event.preventDefault();
        if(!this.state.edit){
            let userResponse = confirm('Are you sure you want to delete this item?');
            if(userResponse){
                this.removeItem(truckID)
            }
        }else{
            let alertColor = {background: "#D75452", text: "#FFFFFF"};
            notify.show('Please cancel edit mode before trying to delete!','custom',4000,alertColor)
        }
    }

    removeItem = (truckID) => {
        let byebye = this.state.food_trucks.filter(truck => truck.id !== truckID);
        this.setState({ food_trucks: byebye });
        let removeColor = { background: '#5FB760', text: "#FFFFFF" };
        notify.show('Food truck successfully removed!', 'custom', 2000, removeColor);     
    }

    showTrucks = () => {
        const { food_trucks } = this.state;
        let allTrucks = [];
        food_trucks.map((truck, index) => {
            allTrucks.push(
               <div className="col-md-3 well">
                <FoodTruckList key={truck.id} name={truck.name} />
                <span>
                    <button className="btn btn-warning" onClick={() => this.handleEdit(event, truck.id)}>edit</button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => this.confirmRemove(event, truck.id)}>delete</button>
                </span>
               </div>
            );
        });
        return allTrucks
    }

    toggleForm = () => {
        if(this.state.edit){
            return (
                <EditForm 
                    truckName={this.state.edit_truck[0].name}
                    value={this.state.edit_truck_name}
                    onChange={event => this.setState({edit_truck_name: event.target.value})}
                    onSubmit={this.updateTruck}
                    handleCancel={(event)=> {event.preventDefault(); this.setState({edit: false, edit_truck_name: ''})}}
                />
            )
        }
        return(
            <CreateForm 
                value={this.state.name} 
                onSubmit={this.createTruck} 
                onChange={event => this.setState({ name: event.target.value })} 
            />
        )
    }

    render(){
        console.log(this.state)
        return(
            <div className="container">
                <Notifications />
                <div className="col-md-12">
                    {this.showTrucks()}
                </div>
                {this.toggleForm()}
            </div>
        )
    }
}