
export const checkLoginDetails = (data) =>
(
  {
    type: 'CHECK_LOGIN_DETAILS',
    data : data
  }
);


export const getRegisteredUserList = (data,token) =>
(
  {
    type: 'GET_REGISTERED_USER_LIST',
    data : data,
    token: token
  }
);


export const submitRegisteredUser = (data,token) =>
(
  {
    type: 'SUBMIT_REGISTERED_USER',
    data : data,
    token: token
  }
);




export const forgetPassword = (data,token) =>
(
  {
    type: 'forgetPassword',
    token: token,
    data : data
  }
);

export const resetPassword = (data,token) =>
(
  {
    type: 'resetPassword',
    token: token,
    data : data
  }
);


export const registerSport = (data,token) =>
(
  {
    type: 'registerSport',
    token: token,
    data : data
  }
);


export const getSports = (data,token) =>
(
  {
    type: 'getSports',
    token: token,
    data : data
  }
);

export const getSpetialization = (data,token) =>
(
  {
    type: 'getSpetialization',
    token: token,
    data : data
  }
);

export const payment = (data,token) =>
(
  {
    type: 'payment',
    token: token,
    data : data
  }
);

export const callback = (data,token) =>
(
  {
    type: 'callback',
    token: token,
    data : data
  }
);