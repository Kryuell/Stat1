import React from 'react';
import {Card,Modal,Button} from 'react-bootstrap';

const Recipe=({full_name,cin,phone_number,email,age,gender,state,city,address,marital_status,nbr_of_children,occupation,salary,onClick,onDelete})=>{
    return(
        <Card className="recipe">
            <Card.Body>
            <p>{full_name}</p>
                <p>{cin}</p>
                <p>{phone_number}</p>
                <p>{email}</p>
                <p>{age}</p>
                <p>{gender}</p>
                <p>{state}</p>
                <p>{city}</p>
                <p>{address}</p>
                <p>{marital_status}</p>
                <p>{nbr_of_children}</p>
                <p>{occupation}</p>
                <p>{salary}</p>
            </Card.Body>
            <Button variant='primary' onClick={onClick}>Update</Button>
                {' '}
            <Button variant='danger' onClick={onDelete}>Delete</Button>
        </Card>
    )
}

export default Recipe;