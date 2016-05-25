import { expect } from 'chai';
import authReducer from '../../../client/reducers/reducer_authentication';
import {
  CHANGE_AUTH,
  AUTH_USER,
  UNAUTH_USER,
  SET_ROLE,
  AUTH_ERROR
} from '../../../client/actions/index';

describe('Authentication Reducer', () => {
  let initialState, userState;

  beforeEach(() => {
    initialState = {
      token: null,
      role: 'donor',
      username: null
    };
  });

  // it('handles action with unknown type', () => {
  //   const action = { type: null, payload: null };
  //   const reducer = authReducer(initialState, action);
  // });

  // it('CHANGE_AUTH', () => {
  //
  // });

  it('AUTH_USER', () => {
    const payload = {
      token: 'testtoken',
      role: 'donor',
      username: 'test_donor'
    };
    const action = { type: AUTH_USER, payload };
    userState = authReducer(initialState, action);
    expect(userState.authenticated).to.eql(true);
    expect(userState.error).to.eql('');
  });

  it('UNAUTH_USER', () => {
    const action = { type: UNAUTH_USER };
    const reducer = authReducer(userState, action);
    expect(reducer.authenticated).to.eql(false);
    expect(reducer.role).to.eql('');
    expect(reducer.token).to.eql('');
    expect(reducer.username).to.eql('');
  });

  it('SET_ROLE', () => {
    const payload = { role: 'user' };
    const action = { type: SET_ROLE, payload };
    const reducer = authReducer(userState, action);
    expect(reducer.role).to.eql('user');
  });

  it('AUTH_ERROR', () => {
    const payload = { error } // unsure of what value to pass to the error property
  });

});
