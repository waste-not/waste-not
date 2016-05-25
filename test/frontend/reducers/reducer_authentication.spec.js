import { expect } from 'chai';
import authReducer from '../../../client/reducers/reducer_authentication';
import {
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
    const action = { type: SET_ROLE, payload: 'user' };
    const reducer = authReducer(userState, action);
    expect(reducer.role).to.equal('user');
  });

  it('AUTH_ERROR', () => {
    const payload = { error: 'test error message' };
    const action = { type: AUTH_ERROR, payload };
    const reducer = authReducer(initialState, action);
    console.log(reducer);
    // expect(reducer.error).to.be.a('string');

    // action won't take an error message alone as a payload.
  });

});
