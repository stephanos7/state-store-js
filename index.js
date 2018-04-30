

// 1. define a factory function that creates an instance of the store (and gets passed a REDUCER function from our app)
function createStore(reducerFunctionFromApp){
  // each instance of Store is comprised of four elements:

  // A. the state tree (the source of truth)
  
  // B. interface to get the state
  // C. a way to listen to changes in the state
  // D. interface to update the state

  // 2. define a state variable which will hold the state tree
  let state = {

  }
  // 4a.provide a way to listen for changes on the state
  //    the user will want to subscribe to the store to listen to changes 
  //    so we need to collect every fn passed in whenever the user subscribes to the store
  //    we can define an array to track these
  let listeners = [];

  // interfaces
  // 3. provide a way to get access to the state variable
  const getState  = () => state

  // 4b.provide a way to listen for changes on the state
  //    provide a subscribe method for the user to subscribe to the store and listen for changes
  const subscribe = (listenerFnPassed) => {
    // push the listener fn provided by the user to the listeners array defined in the prev step
    listeners.push(listenerFnPassed)
    // we should also provide the user with a way to unsubscribe so we can return a fn that does just that
    // the function filters out  from the listeners array the function that was originally passed on subscribe
    return () => {
      listeners.filter(l => { 
         l !== listenerFnPassed;
      })
    }
  }

  // 6. Once the REDUCER reduces the relevant action and the previous state to a new copy of the updated state
  //    we need to take that copy and actually process the state update in the store tree. 
  //    although the reducer is an app specific function we have passed it in as an argument to the createStore function, hence we have acces to it
  //    we will do this with a function called DISPATCH
  //    to achieve the change update like the REDUCER, needs the relevant ACTION and the NEW copy of state that needs to be updated in the state tree
  //    DISPATCH will call the REDUCER to provide it with the new uodated copy of state
  //    but it also needs to take in the relevant ACTION as the action provided to REDUCER was consumed for the production of a new updated copy of state
  const dispatch = (action) => {
    state = reducerFunctionFromApp(action, state);
    // now since we have updated state we need to call every listener function in the listners array and let them know of the change by invoking each one of them.
    listeners.forEach( listener => listener())

  }


  // return an object to the user containing the stores' interface properties 
  return {
    getState,
    subscribe,
    dispatch
  }
}


// 5. We need a way to tie a relevant ACTION to the internal STATE in the store that will final enable the state to evolve/become updated.
//    We do this via a function called a REDUCER like the one below responsible for updating the state of todos
//    The REDUCER will take in the relevant ACTION and the store's STATE
//    As such it must adher to rule #2 (see readme)ie, it must be a PURE function so that it doesn't mutate the original copy of state
//    Since the first time we call the REDUCER, the state may be empty or undefined, we use a default argument to specify that it will at least be passed in as an empty array
//    As per the PURE function prescription, it must not mutate the original arguments, so a NEW copy of state will be returned with every operation
function todo(state=[], action){
  // use a switch to determine how to modify the state based on the TYPE of action provided

  // for example, in the case of adding a new to-do, we just concat the new item to the state using .concat()
  // because .concat() returns a new array, it doesn't mutate the original state but returns a new updated copy of it.

  // similarly .map and .filter do not mutate the original argument and return a new array/copy of state.

  // if the ACTION type is not what we'd expect it to be then we simply return state
  return state
}