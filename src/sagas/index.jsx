import { put, takeLatest, all } from 'redux-saga/effects';

const url="http://localhost:3000/";
const devapi =
{
    'validateUser' : url+'users/validateUser',
    'getRegisteredUserList' : url+'registereduserdetails/getRegisteredUserList',
    'submitRegisteredUser' : url+'registereduserdetails/submitRegisteredUser',

    'forgetPassword' : url+'users/forgetPassword',
    'resetPassword' : url+'users/resetPassword',
    
    'registerSport' : url+'users/registerSport',
    'getSports' : url+'SportDetails/getSports',
    'getSpetialization' : url+'SportDetails/getSpetialization',
}

function* checkLoginDetails(action) {
  const json = yield fetch(
    devapi.validateUser,
    {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(action.data)
    }
    )
    .then(response =>
        response.json()
    );
  yield put({ type: "LOGIN_DETAILS_RECEIVED", json: json });
}

function* submitRegisteredUser(action) {
  const json = yield fetch(
    devapi.submitRegisteredUser,
    {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : action.token
      },
      body : JSON.stringify(action.data)
    }
    )
    .then(response =>
        response.json()
    );
  yield put({ type: "SUBMITTED_REGISTERED_USER_DETAILS_SUCCESS", json: json });
}

function* getRegisteredUserList(action) {
  const json = yield fetch(
    devapi.getRegisteredUserList,
    {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : action.token
      },
      body : JSON.stringify(action.data)
    }
    )
    .then(response =>
        response.json()
    );
  yield put({ type: "GET_REGISTERED_USER_LIST_SUCCESS", json: json });
}


function* registerSport(action) {
  const json = yield fetch(
    devapi.registerSport,
    {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : action.token
      },
      body : JSON.stringify(action.data)
    }
    )
    .then(response =>
        response.json()
    );
  yield put({ type: "registerSport", json: json });
}

function* forgetPassword(action) {
  const json = yield fetch(
    devapi.forgetPassword,
    {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : action.token
      },
      body : JSON.stringify(action.data)
    }
    )
    .then(response =>
        response.json()
    );
  yield put({ type: "forgetPasswordSucsses", json: json });
}

function* resetPassword(action) {
  const json = yield fetch(
    devapi.resetPassword,
    {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : action.token
      },
      body : JSON.stringify(action.data)
    }
    )
    .then(response =>
        response.json()
    );
  yield put({ type: "resetPasswordSucsses", json: json });
}

  function* getSports(action) {
    const json = yield fetch(
      devapi.getSports,
      {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : action.token
        },
        body : JSON.stringify(action.data)
      }
      )
      .then(response =>
          response.json()
      );
    yield put({ type: "getSportsSucsses", json: json });
  }

  function* getSpetialization(action) {
    const json = yield fetch(
      devapi.getSpetialization,
      {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : action.token
        },
        body : JSON.stringify(action.data)
      }
      )
      .then(response =>
          response.json()
      );
    yield put({ type: "getSpetializationSucsses", json: json });
  }


function* actionWatcher() {
  yield takeLatest('CHECK_LOGIN_DETAILS', checkLoginDetails);
  yield takeLatest('GET_REGISTERED_USER_LIST', getRegisteredUserList);
  yield takeLatest('SUBMIT_REGISTERED_USER', submitRegisteredUser);
  
  yield takeLatest('registerSport', registerSport);
  yield takeLatest('forgetPassword', forgetPassword);
  yield takeLatest('resetPassword', resetPassword);

  yield takeLatest('getSports', getSports);
  yield takeLatest('getSpetialization', getSpetialization);

}




export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
