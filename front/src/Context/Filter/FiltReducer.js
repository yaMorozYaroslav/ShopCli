
import {SET_CATEGORY, SET_SEARCH,
	    SET_MIN_PRICE, SET_MAX_PRICE, ERROR} from "./FiltTypes.js"

const FiltReducer = (state, action) => {
  switch (action.type) {
	  
	case SET_CATEGORY:
	  return {...state, itemCategory: action.payload}

    case SET_SEARCH:
      return {...state, itemSearch: action.payload}
    case SET_MIN_PRICE:
      return {...state, itemPrice: {...state.itemPrice, min:action.payload}}
    case SET_MAX_PRICE:
      return {...state, itemPrice: {...state.itemPrice, max:action.payload}}
    case ERROR:
	return{...state,error: action.payload}
   
    default:
      return state;
  }
}

export default FiltReducer;
