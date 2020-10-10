import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux'
import * as actions from '../actions'
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Loader from './Loader.js'
import AppError from './AppError';
Geocoder.init('AIzaSyDAp4vEn-maEzGvN1EOEVN9mlNqNxKlZ48');

class Home extends React.Component{

    constructor(props){
        super(props)
        this.state={
            currentLocation:'',
            loading:true,
        }
    }

    retryFunction = () => {
      this.setState({loading:true})
      this.getCurrrentLocation()
    }


// This method is calling to convert latitude and longiude to address
 convertAddress(laltitude,longitude){
    Geocoder.from(laltitude,longitude)
    .then(json => {
       var addressComponent = json.results[0].address_components[0];
       this.setState({
        currentLocation:addressComponent.short_name,
        loading:false
       })
    })
    .catch(error => console.warn(error));
 }




  async requestLocationPermission() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Assignment App',
            'message': 'Assignment app access your location'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getCurrrentLocation();
          console.log('[Permissions]', 'Location Permission granted')
        } else {
            this.requestLocationPermission();
        }    
      }
    } catch (err) {
      console.warn(err)
    }
  }

  parseData(response){
      this.setState({
        data:response.daily,
        currentTempreture:response.current.temp
      })
  }


  listCallback(){
    this.setState({
      loading:false
    })
  
  }

  //Calling to get current location
  getCurrrentLocation(){
    Geolocation.getCurrentPosition(
      (position) => {
        const currentCoordinate = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.props.getWeatherData(currentCoordinate)
        this.convertAddress(currentCoordinate.latitude,currentCoordinate.longitude)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  }


  componentDidMount() {
    setTimeout(() => {
      this.requestLocationPermission();
    }, 1000)

  }

  getFormatedDate(timeStamp){
    var fulldate = new Date(timeStamp*1000);
    var converted_date = moment(fulldate).format("dddd")
     return converted_date;
  }


  drowRowItem(item){
      return ( 
       <View style={{flexDirection:'column'}}>
         <View style={{ borderBottomColor: 'black', borderBottomWidth: 1}}></View>
       <View
        style={{flexDirection:'row',flex:1, justifyContent:'center',
        alignItems: 'center',height:60}}>
        <Text style={homeStyle.leftItem}>{this.getFormatedDate(item.sunrise)}</Text>
      <Text style={homeStyle.rightItem}>{item.temp.day}</Text>
      </View>
      </View>
      )
  }

 

   render(){
      return(
          <View>
           {this.state.loading? 
            <Loader/>
            :<View>
              {this.props.ds_error_key=='Error'?
              <AppError retryFunction = {this.retryFunction}/>:
              <View> 
            <View style={{justifyContent:'center',alignItems:'center',height:'40%'}}>
            <Text style={homeStyle.headerTempStyle}>{this.props.weatherData.current.temp}</Text>
            <Text style={homeStyle.headerStyle}>{this.state.currentLocation}</Text>
            </View>
             <FlatList
              data={this.props.weatherData.daily}
              renderItem={({item}) =>this.drowRowItem(item)}
              keyExtractor={(item, index) =>item.sunrise}>
             </FlatList>
             </View>
               }
             </View>
          
            }
          </View>
      )
   }

}



const homeStyle=StyleSheet.create({

    leftItem:{
        marginRight:40,
        fontSize:22,
    },
    rightItem:{
        marginLeft:40,
        fontSize:22,
    },
    headerStyle:{
        fontSize:40,
    },
    headerTempStyle:{
        fontSize:100,
    },

  
});


function mapStateToProps({ auth }) {
  const { weatherData,ds_error_key,retry} = auth
  return { weatherData,ds_error_key,retry}
}
export default connect(mapStateToProps, actions)(Home)