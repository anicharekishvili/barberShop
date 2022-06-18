import { useState, useEffect } from 'react';
import { Validators } from './Validators';
import { Link } from 'react-router-dom';
import '../styles/signupAsBarber.scss';

function SignupBarber() {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    price: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(Validators.validateBarberSignup(formValues));
    setIsSubmit(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setIsSubmit(false);
      setFormValues(initialValues);
    }
  }, [formErrors]);

  return (
    <form onSubmit={handleSubmit} className='signupBarber-container'>
      <div className='signupBarber-title'>
        <h1>Sign Up as Barber</h1>
        <p>
          Sign Up as Client
          <Link to='/auth/signup'>Sign Up</Link>
        </p>
      </div>
      <div className='signupBarber-inputs'>
        <input
          name='firstName'
          type='text'
          className=''
          value={formValues.firstName}
          onChange={handleChange}
          placeholder='FIRSTNAME'
        />
        <p className='error-message'>{formErrors.firstName}</p>
        <input
          name='lastName'
          type='text'
          className=''
          value={formValues.lastName}
          onChange={handleChange}
          placeholder='LASTNAME'
        />
        <p className='error-message'>{formErrors.lastName}</p>
        <input
          name='email'
          type='text'
          className=''
          value={formValues.email}
          onChange={handleChange}
          placeholder='E-MAIL'
        />
        <p className='error-message'>{formErrors.email}</p>
        <input
          name='address'
          type='text'
          className=''
          value={formValues.address}
          onChange={handleChange}
          placeholder='ADDRESS'
        />
        <p className='error-message'>{formErrors.address}</p>
        <input
          name='price'
          type='number'
          className=''
          value={formValues.price}
          onChange={handleChange}
          placeholder='PRICE'
        />
        <p className='error-message'>{formErrors.price}</p>
        <div className='signupBarber-footer'>
          <button>Sign Up</button>
          <p className='error-message'>{formErrors.alreadyExists}</p>
          <div className='goToLogin'>
            <p>Already Have an account?</p>
            <Link to='/auth/login'>Log In</Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignupBarber;
