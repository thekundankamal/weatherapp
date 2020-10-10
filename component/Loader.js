
import React from 'react';
import {
  View,
  Image,
} from 'react-native';

export default class Loader extends React.Component{

   render(){
       return(

        <View style={{ flexDirection: 'column',
               justifyContent: 'center',
               backgroundColor:'#fff',
               alignItems: 'center',
               height: '100%'}}>
                   
        <Image 
        source={require('../res/loader.gif')}  
         style={{width: 200, height:200, }} 
       />
                 </View>
       )
   }



}