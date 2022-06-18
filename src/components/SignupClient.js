import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Validators } from './Validators';
import '../styles/signupClient.scss';

function SignupClient({ addActiveUser }) {
  const initialValues = { email: '', password: '', cpassword: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(Validators.validateClientSignup(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setIsSubmit(false);
      addActiveUser(formValues);
      setFormValues(initialValues);
    }
  }, [formErrors]);

  return (
    <form onSubmit={handleSubmit} className='signup-container'>
      <div className='signup-title'>
        <h1>Sign Up as Client</h1>
        <p>
          Sign Up as Barber
          <Link to='/auth/signup-barber'>Sign Up</Link>
        </p>
      </div>
      <div className='signup-inputs'>
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
          value={formValues.password}
          onChange={handleChange}
          name='password'
          type='password'
          className=''
          placeholder='PASSWORD'
        />
        <p className='error-message'>{formErrors.password}</p>
        <input
          value={formValues.cpassword}
          onChange={handleChange}
          name='cpassword'
          type='password'
          className=''
          placeholder='CONFIRM PASSWORD'
        />
        <p className='error-message'>{formErrors.cpassword}</p>
        <div className='signup-footer'>
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

export default SignupClient;
