import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Header from './shared/Header';
import AuthUser from './Session/AuthUser';

class App extends Component {
  state = {}
  componentDidMount() {
    this.onRouteChanged();
  }
  render () {
    let headerComponent = !this.state.isFullPageLayout ? <Header/> : '';

    return (
      <div>
        { headerComponent }
        <div className="az-content-wrapper">
          <AppRoutes/>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {

    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/general-pages/signin', '/general-pages/signup', '/general-pages/page-404', '/login' , '/forgetpassword','/reset/:token'];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.az-content-wrapper').classList.add('p-0');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.az-content-wrapper').classList.remove('p-0');
      }
    }
    if(this.props.location.pathname.slice(0, 7)==='/reset/'){
      this.setState({
        isFullPageLayout: true
      })
      document.querySelector('.az-content-wrapper').classList.add('p-0');
      
    }


  }

}

export default withRouter(App);
