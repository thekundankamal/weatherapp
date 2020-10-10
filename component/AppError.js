import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
 export default class AppError extends React.Component{


    render(){
        return(
        <View style={errorStyle.containerStyle}>
            <Text style={errorStyle.messageStyle}>Something {"\n"}Went Wrong {"\n"}at our End</Text>
            <TouchableOpacity style={errorStyle.retryContainerStyle} onPress={(view)=>this.props.retryFunction()} >
                <Text style={{ color: 'black',
                fontSize: 16}} >RERTY</Text>
            </TouchableOpacity>
        </View>
        )
    }

}


const errorStyle=StyleSheet.create({
    messageStyle:{
        fontSize:45,
        marginBottom:20,
    },
    retryContainerStyle:{
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor:'#fff',
        borderColor: 'black',
        width:100,
        height:50,
        borderWidth: 1,
        alignItems: 'center'
    },
    containerStyle:{
         flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor:'#fff',
        alignItems: 'center',
        height: '100%'}
    
});

