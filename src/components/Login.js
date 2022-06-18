import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Validators } from './Validators';
import '../styles/Login.scss';

function Login({ addActiveUser }) {
  const values = { email: '', password: '' };
  const [formValues, setFormValues] = useState(values);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(Validators.validateLogin(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (!formErrors.wrongEmailOrPassword) {
        setIsSubmit(false);
        addActiveUser(formValues);
        setFormValues(values);
      }
    }
  }, [formErrors]);

  return (
    <form onSubmit={handleSubmit} className='login-container'>
      <h1 className='login-title'>Login</h1>
      <div className='login-inputs'>
        <input
          name='email'
          type='text'
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
          placeholder='PASSWORD'
        />
        <p className='error-message'>{formErrors.password}</p>
        <div className='login-footer'>
          <button>Log In</button>
          <p className='error-message'>{formErrors.wrongEmailOrPassword}</p>
          <div className='goToSigup'>
            <p>Don't Have an account?</p>
            <Link to='/auth/signup-client'>Sign Up</Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
