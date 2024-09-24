import React,{useEffect,useState} from 'react';
import './Main.css';
import Navbar from '../Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import email from '../../Assests/email.png';
import linkedin from '../../Assests/linkedin.png';
import aboutimage from '../../Assests/images (3).jpeg';
import twitter from '../../Assests/x.png';
import videobg from '../../Assests/videobg.mp4';
import teamMember1 from '../../Assests/images (3).jpeg'; // Replace with your actual image path
import teamMember2 from '../../Assests/images (3).jpeg'; // Replace with your actual image path
import teamMember3 from '../../Assests/images (3).jpeg'; // Replace with your actual image path
import teamMember4 from '../../Assests/images (3).jpeg'; // Replace with your actual image path
import { useAuth } from '../../auth';
import Recipe from '../Recipe';
import{useForm} from 'react-hook-form'
import {Modal,Form,Button} from 'react-bootstrap'


const LoggedInHome = () => {
  const [recipes, setRecipes] = useState([]);
  const [show, setShow] = useState(false);
  const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm();
  const [recipeId, setRecipeId] = useState(0);

  useEffect(() => {
    fetch('/recipe/recipes')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRecipes(data);
      })
      .catch(err => console.log(err));
  }, []);

  const getAllRecipes = () => {
    fetch('/recipe/recipes')
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
      })
      .catch(err => console.log(err));
  };

  const closeModal = () => {
    setShow(false);
  };

  const showModal = (id) => {
    setShow(true);
    setRecipeId(id);

    recipes.forEach((recipe) => {
      if (recipe.id === id) {
        setValue('full_name', recipe.full_name);
        setValue('cin', recipe.cin);
        setValue('phone_number', recipe.phone_number);
        setValue('email', recipe.email);
        setValue('age', recipe.age);
        setValue('gender', recipe.gender);
        setValue('state', recipe.state);
        setValue('city', recipe.city);
        setValue('address', recipe.address);
        setValue('marital_status', recipe.marital_status);
        setValue('nbr_of_children', recipe.nbr_of_children);
        setValue('occupation', recipe.occupation);
        setValue('salary', recipe.salary);
      }
    });
  };

  const updateRecipe = (data) => {
    let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
    console.log(data);

    const requestOptions = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify(data)
    };

    fetch(`/recipe/recipe/${recipeId}`, requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log(data);
       const reload = window.location.reload();
       reload()
      })
      .catch(err => console.log(err));
  };

  const deleteRecipe = (id) => {
    let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
    console.log(id);

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}`
      }
    };

    fetch(`/recipe/recipe/${id}`, requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        getAllRecipes();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Navbar/>
      <div className="recipe">
      <Modal show={show} size="lg" onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form >
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
                <button type="submit" className="btn btn-primary" onClick={handleSubmit(updateRecipe)}>
                  Submit
                </button>
              </form>


          </Modal.Body>
        </Modal>
        <h1>List of Your Forms</h1>
        {
          recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              full_name={recipe.full_name}
              cin={recipe.cin}
              phone_number={recipe.phone_number}
              email={recipe.email}
              age={recipe.age}
              gender={recipe.gender}
              state={recipe.state}
              city={recipe.city}
              address={recipe.address}
              marital_status={recipe.marital_status}
              nbr_of_children={recipe.nbr_of_children}
              occupation={recipe.occupation}
              salary={recipe.salary}
              onClick={() => { showModal(recipe.id); }}
              onDelete={() => { deleteRecipe(recipe.id); }}
            />
          ))
        }
        <br></br>
      </div>
      
    </>
  );
};



const LoggedOutHome =()=>{
  return(
    <>
              {/* HERO SECTION */}
          <section className="hero-section">
          <video src={videobg} autoPlay loop muted className="video-bg" />
          <div className="hero">
            <Link to="/login">
              <button className="btn-hero">Get Started</button>
            </Link>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="about-section" id="about">
          <div className="about">
            <h1 className="heading text-uppercase">About Us</h1>
            <span className="text-black-50">Statify is a Morocco statistics online</span>
            <div className="about-content">
              <div className="about-image">
                <img src={aboutimage} alt="about-image" />
              </div>
              <div className="about-info">
                <p>Statify is a groundbreaking platform designed to transform the way Morocco conducts its national census. Our mission is to streamline the data collection process by empowering citizens to participate directly. We believe that by modernizing this vital task, we can improve the accuracy, efficiency, and cost-effectiveness of large-scale statistical reporting. At Statify, we’re committed to innovation that benefits both the government and the people. Our platform enables individuals to easily input their own information, eliminating the need for traditional data collectors and saving valuable time and resources. Join us in building a smarter, more connected Morocco, where every voice matters, and every data point contributes to a brighter future.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM MEMBERS SECTION */}
        <section className="team-section" id="team">
          <h1 className="title text-uppercase">Our Team</h1>
          
          <Carousel interval={1000000} pause={false} controls={true}>
            <Carousel.Item>
              <img
                className="d-block"
                src={teamMember1}
                alt="First team member"
              />
              <Carousel.Caption>
                <h3>Mounim Nadir</h3>
                <p>Position and brief description of team member.</p>
                
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src={teamMember2}
                alt="Second team member"
              />
              <Carousel.Caption>
                <h3>Abdelaaziz Khouda</h3>
                <p>Position and brief description of team member.</p>
                
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src={teamMember3}
                alt="Third team member"
              />
              <Carousel.Caption>
                <h3>Mohamed El Bouhmi</h3>
                <p>Position and brief description of team member.</p>
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src={teamMember4}
                alt="Fourth team member"
              />
              <Carousel.Caption>
                <h3>Hamid Bouayadi</h3>
                <p>Position and brief description of team member.</p>
              
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>


        {/* CONTACT SECTION  1*/}

        <h1 className="title text-uppercase">Team socials</h1>
        <section className="contact-section" id="contact">
          <div className="contact">
            <h1 className="title-sub text-uppercase">Mounim's socials</h1>
            <p className="text-black-50">Get in Touch</p>
            <div className="contact-info-upper-container">
              <div className="contact-info-container">
                <img
                  src={email}
                  alt="Email icon"
                  className="icon contact-icon email-icon"
                />
                <p><a href="mailto:mounimnadir7@gmail.com">Gmail</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={linkedin}
                  alt="LinkedIn icon"
                  className="icon contact-icon"
                />
                <p><a href="https://www.linkedin.com/in/mounim-nadir-b6575b27a">LinkedIn</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={twitter}
                  alt="Twitter icon"
                  className="icon contact-icon"
                />
                <p><a href="https://x.com/MounimNadir">X-Twitter</a></p>
              </div>
            </div>
          </div>
        </section>
    {/* CONTACT SECTION  2*/}
        <section className="contact-section" id="contact">
          <div className="contact">
            <h1 className="title text-uppercase">Abdelaziz's socials</h1>
            <p className="text-black-50">Get in Touch</p>
            <div className="contact-info-upper-container">
              <div className="contact-info-container">
                <img
                  src={email}
                  alt="Email icon"
                  className="icon contact-icon email-icon"
                />
                <p><a href="mailto:Bouayadihamid@gmail.com">Gmail</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={linkedin}
                  alt="LinkedIn icon"
                  className="icon contact-icon"
                />
                <p><a href="https://www.linkedin.com/in/mounim-nadir-b6575b27a">LinkedIn</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={twitter}
                  alt="Twitter icon"
                  className="icon contact-icon"
                />
                <p><a href="https://twitter.com/AbdelKhouda">X-Twitter</a></p>
              </div>
            </div>
          </div>
        </section>
        {/* CONTACT SECTION  3*/}
        <section className="contact-section" id="contact">
          <div className="contact">
            <h1 className="title text-uppercase">Mohammed's socials</h1>
            <p className="text-black-50">Get in Touch</p>
            <div className="contact-info-upper-container">
              <div className="contact-info-container">
                <img
                  src={email}
                  alt="Email icon"
                  className="icon contact-icon email-icon"
                />
                <p><a href="mailto:Bouayadihamid@gmail.com">Gmail</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={linkedin}
                  alt="LinkedIn icon"
                  className="icon contact-icon"
                />
                <p><a href="https://www.linkedin.com/in/mounim-nadir-b6575b27a">LinkedIn</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={twitter}
                  alt="Twitter icon"
                  className="icon contact-icon"
                />
                <p><a href="https://twitter.com/AbdelKhouda">X-Twitter</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION  4*/}
        <section className="contact-section" id="contact">
          <div className="contact">
            <h1 className="title text-uppercase"> Hamid's socials</h1>
            <p className="text-black-50">Get in Touch</p>
            <div className="contact-info-upper-container">
              <div className="contact-info-container">
                <img
                  src={email}
                  alt="Email icon"
                  className="icon contact-icon email-icon"
                />
                <p><a href="mailto:Bouayadihamid@gmail.com">Gmail</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={linkedin}
                  alt="LinkedIn icon"
                  className="icon contact-icon"
                />
                <p><a href="https://www.linkedin.com/in/mounim-nadir-b6575b27a">LinkedIn</a></p>
              </div>
              <div className="contact-info-container">
                <img
                  src={twitter}
                  alt="Twitter icon"
                  className="icon contact-icon"
                />
                <p><a href="https://twitter.com/AbdelKhouda">X-Twitter</a></p>
              </div>
            </div>
          </div>
        </section>
        
  </>
  )
}

function Main() {
  const [logged]=useAuth()
  return (
      <div>
      {logged?<LoggedInHome/>:<LoggedOutHome/>}
      </div>
  );
}

export default Main;
