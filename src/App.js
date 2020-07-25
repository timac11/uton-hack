import React from 'react';
import './App.less';
import {connect, Provider} from "react-redux";
import configureStore from "./store/configureStore";
import RoutingWrapper from "./RoutingWrapper";
const store = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <RoutingWrapper/>
      </Provider>
    );
  }
}

export default App;
