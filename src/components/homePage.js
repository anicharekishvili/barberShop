import { useNavigate } from 'react-router-dom';
import Logo from '../assets/barber-logo.jpeg';
import '../styles/homePage.scss';
import { useEffect, useState } from 'react';
import * as DbActions from './db';

function HomePage({ signOut }) {
  const navigate = useNavigate();
  const [barbers, setBarbers] = useState();

  const handleClick = () => {
    navigate('/homePage', { replace: true });
  };

  const handleSignOut = () => {
    signOut();
  };
  useEffect(() => {
    const barbersList = DbActions.fetchBarberList();
    setBarbers(barbersList);
  }, []);
  return (
    <div>
      <nav className='navbar'>
        <div className='logo' onClick={handleClick}>
          <img src={Logo}></img>
          <span>Barber Shop</span>
        </div>
        <div className='log-out'>
          <a href='#' onClick={handleSignOut}>
            Log Out
          </a>
        </div>
      </nav>

      <ul className='barberList'>
        {!barbers?.length ? (
          <p>there is no barber</p>
        ) : (
          barbers.map(barber => (
            <div onClick={() => handleClick(barber.id)} key={barber.id}>
              <div className='barberlist-card'>
                <div className=''>Barber {barber.id}</div>
                <p>First name: {barber.firstName}</p>
                <p>Last name: {barber.lastName}</p>
                <p>Email: {barber.email}</p>
                <p>Price:{barber.price}$</p>
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}

export default HomePage;
