import { create } from 'apisauce'
import {
  GET_WEATHER_DATA,
  API_BASE_URL,
  ERROR_GENERATED,
  CLEAR_ERROR, RETRY,
} from './types'
const api = create({
  baseURL: API_BASE_URL,
})

// Weather Data
export const getWeatherData = (currentCoordinate) => {
  return async dispatch => {
    async function onSuccess(success) {
      console.log("data---"+JSON.stringify(success))
      dispatch({ type: GET_WEATHER_DATA, payload: success});
    }
    function onError(error) {
      dispatch({ type: ERROR_GENERATED, payload:'Error' });
    }
    try {
     await api.get('onecall?lat='+currentCoordinate.latitude+'&lon='+currentCoordinate.longitude+'&exclude=hourly,minutely&appid=03383072cceb4f4514495b766b62636f')
         .then(response => response.data)
         .then((responseJson) =>{
          if(responseJson.cod==401){ 
          return onError(responseJson)
         }else{
           onSuccess(responseJson)
         }
        }
          )
        
    } catch (error) {
      return onError(error);
    }
  }
}


// Retry request
export const retryrequest = () => {
  return async dispatch => {
    dispatch({ type: RETRY, payload: true});
  }
}
