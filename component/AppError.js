import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import RNRestart from 'react-native-restart'

 export default class AppError extends React.Component{
     constructor(props){
         super(props)
         this.state={hasError:false}
     }
       

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
     return { hasError: true };
      }


      render(){
        if(this.state.hasError){  
        return(
        <View style={errorStyle.containerStyle}>
            <Text style={errorStyle.messageStyle}>Something {"\n"}Went Wrong {"\n"}at our End</Text>
            <TouchableOpacity style={errorStyle.retryContainerStyle} onPress={(view)=>RNRestart.Restart()} >
                <Text style={{ color: 'black',
                fontSize: 16}} >RERTY</Text>
            </TouchableOpacity>
        </View>
        )
        }else{
            return this.props.children;
        }
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

