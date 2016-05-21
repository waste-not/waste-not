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

  // it('handles action with unknown type', () => {
  // });
  //
  // it('CHANGE_AUTH', () => {
  //
  // });

  it('AUTH_USER', () => {
    const initialState = {
      token: null,
      role: 'donor',
      username: null
    };
    const payload = {
      token: 'testtoken',
      role: 'donor',
      username: 'test_donor'
    };
    const action = { type: AUTH_USER, payload };
    const reducer = authReducer(initialState, action);
    expect(reducer.authenticated).to.eql(true);
    expect(reducer.error).to.eql('');
  });
  // it('UNAUTH_USER', () => {
  //
  // });
  // it('SET_ROLE', () => {
  //
  // });
  // it('CHANGE_AUTH', () => {
  //
  // });

});
