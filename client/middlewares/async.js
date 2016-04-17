// May need this middle for requests that return promise...
export default function({ dispatch }) {
  return next => action => {
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    //Make sure the action's promise resolves
    action.payload
      .then(function(res) {
        const newAction = { ...action, payload: res };
        dispatch(newAction);
      });
  }
}
