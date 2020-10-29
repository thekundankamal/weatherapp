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
import AppError from './component/AppError';
class App extends React.Component{
  render(){
    return( 
      <Provider store={store}>
      <AppError>
       <Home/>
       </AppError>
      </Provider>
    )
  
  }
}
export default App;
