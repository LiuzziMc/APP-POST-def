import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './NavbarComponent.css';
import logo from '../../../assets/images/logo.gif'
import { setSearchQuery } from '../../../features/posts/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

function NavbarComponent() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.posts.search);

  // Funzione per gestire il cambiamento nella barra di ricerca
  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    dispatch(setSearchQuery(newValue));
  };

  return (
    <Navbar variant="white" expand="lg">
      <Link to="/" className='custom-link text-decoration-none'>
        <Navbar.Brand className='text-white text'>Post-App</Navbar.Brand>
      </Link>
        <div>
           <img src={logo} alt="Logo" className="custom-logo"/>
       </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Form className='d-flex ms-auto'>
          <FormControl  type='text' placeholder='Cerca post per titolo' value={searchQuery} onChange={handleChangeSearchQuery} className='transparent-input'/>
          <Button className="btn-search btn-outline">Cerca</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
