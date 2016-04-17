// Not being used currently. Meant to be used as a High Order component
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Role extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { role: state.auth.role };
  }

  return connect(mapStateToProps)(Role);
}
