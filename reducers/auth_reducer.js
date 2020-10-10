// Auth Reducer At The Time Of Login

import {
  GET_WEATHER_DATA,
  ERROR_GENERATED,
  RETRY,
} from '../actions/types'

const INITIAL_STATE = {
  weatherData: null,
  retry:false,
  currentTempreture:  '',
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_WEATHER_DATA:
      return { ...state, weatherData: action.payload, ds_error_key: '' }

    case ERROR_GENERATED:
      return { ...state, ds_error_key: action.payload }
      case RETRY:
        return { ...state, retry: action.payload }
    default:
      return state
  }
}
