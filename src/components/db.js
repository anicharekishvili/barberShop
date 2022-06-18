const barberUsers = [
  {
    id: 1,
    firstName: 'firstname',
    lastName: 'lastname',
    email: 'email@gmail.com',
    address: 'address',
    price: '100',
  },
];

const clientUsers = [
  {
    email: 'test@gmail.com',
    password: '12345678',
  },
];

export const registerBarber = newUser => {
  const { firstName, lastName, email, address, price } = newUser;
  const authentificatedUser = barberUsers.find(o => o.email == email);

  if (
    !authentificatedUser &&
    firstName &&
    lastName &&
    address &&
    price &&
    email
  ) {
    const uId = Date.now();

    barberUsers.push({
      id: uId,
      firstName,
      lastName,
      email,
      address,
      price,
    });

    return true;
  }

  return false;
};

export const registerClient = newUser => {
  const { email, password } = newUser;
  const authentificatedUser = clientUsers.find(o => o.email == email);

  if (!authentificatedUser && email && password) {
    clientUsers.push({
      email,
      password,
    });

    return true;
  }

  return false;
};

export const loginUser = user => {
  const { email, password } = user;

  const authentificatedUser = clientUsers.find(
    o => o.email == email && o.password == password
  );

  if (authentificatedUser) {
    return { ...authentificatedUser };
  }

  return false;
};

export const userHasSubscribedBarber = (email, barberId) => {
  const activeUser = clientUsers.find(o => o.email == email);

  if (activeUser) {
    return activeUser.orderedBarberIds.indexOf(barberId) !== -1;
  }

  return false;
};

export const addBarberSubscription = (email, barberId) => {
  const activeUser = clientUsers.find(o => o.email == email);

  if (activeUser) {
    activeUser.orderedBarberIds.push(barberId);
  }

  return false;
};

export const fetchBarberDetail = id => {
  const barber = barberUsers.find(o => o.id == id);

  if (barber) {
    return { ...barber };
  }

  return null;
};

export const addBarberRate = (id, { rate, description }) => {
  const barber = barberUsers.find(o => o.id == id);

  if (barber) {
    const uId = Date.now();

    barber.userRates.push({ id: uId, rate, description });
    return true;
  }

  return null;
};

export const fetchBarberList = () => {
  return barberUsers.map(o => o);
};
