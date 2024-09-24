import React from 'react';
import {Card,Modal,Button} from 'react-bootstrap';

const Recipe=({full_name,cin,phone_number,email,age,gender,state,city,address,marital_status,nbr_of_children,occupation,salary,onClick,onDelete})=>{
    return(
        <Card className="recipe">
            <Card.Body>
                <p>Full Name: {full_name}</p>
                <p>CIN: {cin}</p>
                <p>Phone Number: {phone_number}</p>
                <p>Email: {email}</p>
                <p>Age: {age}</p>
                <p>Gender: {gender}</p>
                <p>State: {state}</p>
                <p>City: {city}</p>
                <p>Address: {address}</p>
                <p>Marital: {marital_status}</p>
                <p>Number of children: {nbr_of_children}</p>
                <p>Occupation: {occupation}</p>
                <p>Salary: {salary}</p>
            </Card.Body>
            <Button variant='primary' onClick={onClick}>Update</Button>
                <br></br>
            <Button variant='danger' onClick={onDelete}>Delete</Button>
        </Card>
    )
}

export default Recipe;