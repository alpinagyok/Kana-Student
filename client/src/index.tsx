import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import {
  Route, BrowserRouter as Router, Switch, Redirect,
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import reportWebVitals from './reportWebVitals';
import store from './store';
import Test from './Test';
import Header from './components/Header';
import Footer from './components/Footer';
import Stepper from './pages/learn/Stepper';
import Lesson from './pages/lesson';
import Achievements from './pages/achievements';
import { AuthProvider } from './contexts/authContext';
import { ToastProvider } from './contexts/toastContext';
import Toasts from './components/toast/Toasts';

// Make sure that app height is proper (safari fix)
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
appHeight();

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <Provider store={store}>
      <AuthProvider>
        <ToastProvider>
          <Header />
          <Container style={{ flex: 1 }} maxWidth="lg">
            <Toasts />
            <Switch>
              <Route exact path="/" component={Test} />
              <Route exact path="/learn" component={Stepper} />
              <Route exact path="/lesson" component={Lesson} />
              <Route exact path="/achievements" component={Achievements} />
              <Route exact path="/test" component={Test} />
              <Route path="/404" component={Test} />
              <Redirect to="/404" />
            </Switch>
          </Container>
          <Footer />
        </ToastProvider>
      </AuthProvider>
    </Provider>
  </Router>,
  // </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
