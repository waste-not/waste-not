// Not being used currently. Meant to be used as a High Order component
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.auth.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}



// // In some other location... Not in this file...
// // We want to use this HOC
// // import Authentication // this is my HOC
// // import Resources // this is the componenet I want to wrap
//
// const ComposedComponent = Authentication(Resources);
//
// // In some render method...
// <ComposedComponent resources={resourceList}/>
