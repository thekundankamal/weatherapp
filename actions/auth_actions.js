import { AsyncStorage, Alert } from 'react-native';
import axios from 'axios'
import { create } from 'apisauce'
import {
  GET_WEATHER_DATA,
  API_BASE_URL,
  ERROR_GENERATED,
  CLEAR_ERROR,
} from './types'

const api = create({
  baseURL: API_BASE_URL,
})

// Weather Data
export const getWeatherData = (currentCoordinate,loader) => {
  return async dispatch => {
    async function onSuccess(success) {
      dispatch({ type: GET_WEATHER_DATA, payload: success});
      loader();
    }
    function onError(error) {
      dispatch({ type: ERROR_GENERATED, payload:null });
      loader();
    }
    try {
     await api.get('onecall?lat='+currentCoordinate.latitude+'&lon='+currentCoordinate.longitude+'&exclude=hourly,minutely&appid=03383072cceb4f4514495b766b62636f')
         .then(response => response.data)
         .then((responseJson) =>{ return onSuccess(responseJson)})
        
    } catch (error) {
      return onError(error);
    }
  }
}
