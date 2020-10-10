/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { Provider } from 'react-redux';
import Home from './component/Home';
import store from './store';
class App extends React.Component{
  render(){
    return( 
      <Provider store={store}>
       <Home/>
      </Provider>
    )
  
  }
}

  

export default App;
