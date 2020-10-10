// Auth Reducer At The Time Of Login

import {
  GET_WEATHER_DATA,
  CLEAR_ERROR,
} from '../actions/types'

const INITIAL_STATE = {
  weatherData: null,
  currentTempreture:  '',
  contactus: '',
  aboutus: [],
  logindata: '',
  forgot_password: '',
  email: '',
  resetpassworddata: '',
  dispensarylist: [],
  featuredisplist: [],
  citylist: [],
  citieslist: [],
  serviceslist: [],
  categorylist: [],
  searchlist: [],
  postdata: [],
  explorelist: [],
  jobdata: [],
  joblist: [],
  jobdetail: [],
  // newslist: [],
  // newsdata: [],
  blogdata: [],
  bloglist: [],
  giveawaylist: [],
  eventdata: [],
  password: '',
  token: '',
  ds_error_key: '',
  logout: '',
  profile_data: null,
  savedata: [],
  deletedata: [],
  savelist: [],
  jobcitieslist: [],
  reaction:[]
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_WEATHER_DATA:
      console.log("weather----"+JSON.stringify(action.payload.daily))
      return { ...state, weatherData: action.payload, ds_error_key: '' }

    case CLEAR_ERROR:
      return { ...state, ds_error_key: '' }

    default:
      return state
  }
}
