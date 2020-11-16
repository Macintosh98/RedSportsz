const INITIAL_STATE = {}
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_DETAILS_RECEIVED':
      return { ...state, loginDetails: action.json, loading: false }
    case 'SUBMITTED_REGISTERED_USER_DETAILS_SUCCESS':
      return { ...state, registeredUserDetails: action.json, loading: false }
    case 'GET_REGISTERED_USER_LIST_SUCCESS':
        return { ...state, registeredUserList: action.json,loading: false };

    case'forgetPasswordSucsses':
      return { ...state,forgetPasswordSucsses:action.json,loading:false}
    case'resetPasswordSucsses':
      return { ...state,resetPasswordSucsses:action.json,loading:false}

    case'getSportsSucsses':
      return { ...state,getSportsSucsses:action.json,loading:false}
    case'getSpetializationSucsses':
      return { ...state,getSpetializationSucsses:action.json,loading:false}
      
    case'registerSport':
      return { ...state,registerSportSucsses:action.json,loading:false}
    default:
      if(state!=INITIAL_STATE){
        return {state,loading: true}
      }
      return state;
  }
};

export default reducer;
