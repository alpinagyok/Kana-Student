import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import {
  Route, BrowserRouter as Router, Switch, Redirect,
} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import Test from './Test';
import Header from './components/Header';
import Footer from './components/Footer';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/test" component={Test} />
          <Route path="/404" component={Test} />
          <Redirect to="/404" />
        </Switch>
        <Footer />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
