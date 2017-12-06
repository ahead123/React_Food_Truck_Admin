import React from 'react';

const FoodTruckList = ({ name, onClick }) => {
    return <div onClick={onClick} style={{ listStyle: 'none', textAlign: 'center' }}>{name}</div>
}

export default FoodTruckList