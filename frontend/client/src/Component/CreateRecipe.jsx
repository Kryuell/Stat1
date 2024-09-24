import React from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../Component/Navbar/Navbar';
import './CreateRecipe.css';

const CreateRecipePage = () => {
  // hna kayn des functions dial useForm, bach ncontrolaw l form o les erreurs
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const createRecipe = async (data) => {
    // hna kansiftou les données li l3ab zirha fl form
    console.log(data);

    // njibu token mn localStorage
    const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
    console.log(token);

    // hna kayn les options dial requête POST li ghadi nsifto
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}`, // hna kandirou token fl headers
      },
      body: JSON.stringify(data), // na3mlou stringify l'données li s7bna mn l form
    };

    try {
      // fetch kaydir requête l API bach nsiftou données (POST)
      const res = await fetch('/recipe/recipes', requestOptions); // hna darna correction l'URL bch tconforme 3la Flask backend, khass tkon localhost:5000

      // hna njibo l status dial l response
      console.log('Response status:', res.status); // l3ayba kant bach njibo details
      
      if (!res.ok) {
        // hna kancheckiw wach l response f l'interval dial success
        const errorMessage = await res.text(); // ncheckiw wach l'HTML awla JSON li jena
        throw new Error(`Error: ${errorMessage}`);
      }

      const responseData = await res.json(); // njiibo l'données JSON
      console.log(responseData); // data ghadi nrendu bach ngolo wach successful awla error
      reset(); // reset l form mlli t'achèvement
    } catch (err) {
      console.log('Fetch error:', err); // hna kanprintiw l'erreur
      alert(`Error: ${err.message}`); // affichage d'erreur pour l'utilisateur
    }
  };

  return (
    <>
      {/* Navbar dialna */}
      <Navbar />
      <div className="container mt-5">
        <h1>Create Recipe Form</h1>
        <form onSubmit={handleSubmit(createRecipe)}>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="full_name"
              placeholder="Enter full name"
              {...register('full_name', { required: true, maxLength: 25 })} // kanverifyo wach l'input makhod
            />
            {/* Afficher les erreurs */}
            {errors.full_name && <small style={{ color: 'red' }}>Full Name is required</small>}
            {errors.full_name?.type === 'maxLength' && (
              <small style={{ color: 'red' }}>Full Name should be less than 25 characters</small>
            )}
          </div>

          {/* CIN */}
          <div className="form-group">
            <label htmlFor="cin">CIN</label>
            <input
              type="text"
              className="form-control"
              id="cin"
              placeholder="Enter CIN"
              {...register('cin', { required: true })} // CIN khass ykoun required
            />
            {errors.cin && <small style={{ color: 'red' }}>CIN is required</small>}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phone_number"
              placeholder="Enter phone number"
              {...register('phone_number', { required: true })} // Phone number khass ykoun valid
            />
            {errors.phone_number && <small style={{ color: 'red' }}>Phone Number is required</small>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              {...register('email', { required: true })} // email khass ykoun required
            />
            {errors.email && <small style={{ color: 'red' }}>Email is required</small>}
          </div>

          {/* Age */}
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              placeholder="Enter age"
              {...register('age', { required: true })} // Age khass ykoun valid o required
            />
            {errors.age && <small style={{ color: 'red' }}>Age is required</small>}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              className="form-control"
              id="gender"
              placeholder="Enter gender"
              {...register('gender', { required: true })} // Gender khass ykoun valid
            />
            {errors.gender && <small style={{ color: 'red' }}>Gender is required</small>}
          </div>

          {/* State */}
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              className="form-control"
              id="state"
              placeholder="Enter state"
              {...register('state', { required: true })} // State khass ykoun obligatoire
            />
            {errors.state && <small style={{ color: 'red' }}>State is required</small>}
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="Enter city"
              {...register('city', { required: true })} // City khass ykoun
            />
            {errors.city && <small style={{ color: 'red' }}>City is required</small>}
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter address"
              {...register('address', { required: true })} // Address khass ykoun
            />
            {errors.address && <small style={{ color: 'red' }}>Address is required</small>}
          </div>

          {/* Marital Status */}
          <div className="form-group">
            <label htmlFor="marital_status">Marital Status</label>
            <input
              type="text"
              className="form-control"
              id="marital_status"
              placeholder="Enter marital status"
              {...register('marital_status', { required: true })} // marital status required
            />
            {errors.marital_status && <small style={{ color: 'red' }}>Marital Status is required</small>}
          </div>

          {/* Number of Children */}
          <div className="form-group">
            <label htmlFor="nbr_of_children">Number of Children</label>
            <input
              type="number"
              className="form-control"
              id="nbr_of_children"
              placeholder="Enter number of children"
              {...register('nbr_of_children')} // Children field khass ykoun optional
            />
          </div>

          {/* Occupation */}
          <div className="form-group">
            <label htmlFor="occupation">Occupation</label>
            <input
              type="text"
              className="form-control"
              id="occupation"
              placeholder="Enter occupation"
              {...register('occupation', { required: true })} // Occupation required
            />
            {errors.occupation && <small style={{ color: 'red' }}>Occupation is required</small>}
          </div>

          {/* Salary */}
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="salary"
              placeholder="Enter salary"
              {...register('salary', { required: true })} // Salary required
            />
            {errors.salary && <small style={{ color: 'red' }}>Salary is required</small>}
          </div>

          {/* Button to submit form */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        
      </div><br />
    </>
  );
};

export default CreateRecipePage;
