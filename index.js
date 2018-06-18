

// 1. define a factory function that creates an instance of the store (and gets passed a REDUCER function from our app)
function createStore(reducerFunctionFromApp){
  // each instance of Store is comprised of four elements:

  // A. the state tree (the source of truth)
  
  // B. interface to get the state
  // C. a way to listen to changes in the state
  // D. interface to update the state

  // 2. define a state variable which will hold the state tree
  let state;
  // 4a.provide a way to listen for changes on the state
  //    the user will want to subscribe to the store to listen to changes 
  //    so we need to collect every fn passed in whenever the user subscribes to the store
  //    we can define an array to track these
  let listeners = [];

  // interfaces
  // 3. provide a way to get access to the state variable
  const getState  = () => state;

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
  //    Because the reducer is an app specific function we have passed it in as an argument to the createStore factory fanction in order to be able to acces it
  //    we will do this with a function called DISPATCH
  //    DISPATCH will call the REDUCER to provide it with the new copy of state
  //    but it also needs to take in the relevant ACTION as the action provided to REDUCER was consumed for the production of a new updated copy of state
  const dispatch = (action) => {
    state = reducerFunctionFromApp(state, action);
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


// REDUCER for handling todos

// 5. We need a way to tie a relevant ACTION to the internal STATE in the store that will finally enable the state to evolve/become updated.
//    We do this via a function called a REDUCER like the one below responsible for updating the state of todos
//    The REDUCER will take in the relevant ACTION and the store's current STATE and reduce them to a newly returned state
//    As such it must adher to rule #2 (see readme)i.e., it must be a PURE function so that it doesn't mutate the original copy of state
//    Since the first time we call the REDUCER, the state may be empty or undefined, we use a default argument to specify that it will at least be passed in as an empty array
//    As per the PURE function prescription, it must not mutate the original arguments, so a NEW copy of state will be returned with every operation
function todos(state=[], action){
  // use a switch to determine how to modify the state based on the TYPE of action provided
  switch(action.type){
  // for example, in the case of adding a new to-do, we just concat the new item to the state using .concat()
  // because .concat() returns a new array, it doesn't mutate the original state but returns a new updated copy of it.
    case 'ADD_TODO' :
      return state.concat([action.todo]);
  // similarly .map and .filter with Object.assign do not mutate the original argument and return a new array/copy of state.
    case 'REMOVE_TODO' :
      return state.filter(todo => todo.id !== action.id);
    case 'TOGGLE_TODO' :
      return state.map((todo) => todo.id !== action.id ? todo :
      Object.assign({}, todo, { complete: !todo.complete }));
  // if the ACTION type is not what we'd expect it to be then we simply return state
    default :
      return state;
  }
}

// REDUCER for handling goals

// 7. If we now go ahead and create a goals REDUCER we need to combine both the todos and goals reducers
//    into one single reducer, since as we've just seen in step #6 (and #1) our createStore factory function
//    will only accept one reducer as an argument to updating the whole state tree.
//    which takes us to step 8...
function goals(state=[], action){  
  switch(action.type){
    case 'ADD_GOAL' :
      return state.concat([action.goal]);
    case 'REMOVE_GOAL':
      return state.filter( goal => goal.id !== action.id);
    case 'TOGGLE_GOAL':
      return state.map( goal => goal.id !== action.id ? goal :
        Object.assign({}, goal, {complete: !goal.complete}));
    default :
    return state;
  }
}

// 8. Let's create a ROOT REDUCER called app
//    the ROOT REDUCER will return a new copy of state just like our single reducers
//    but instead of returning an array of either goals or todos
//    it will return a state object containing both as properties
//    within each property we invoke the single reducer functions we have defined earlier 
//    as with the prev REDUCERS, the ROOT REDUCER takes state and an action as arguments
//    which will be passed to each individual reducer functions
//    the root reducer will be the function passed to createStore
function app(state={}, action){
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

const store = createStore(app);


store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

store.dispatch({
  type: "ADD_GOAL",
  goal:{
    id: 001,
    description: "hello world goal",
    complete: false
  }
})


store.dispatch({
  type: "ADD_TODO",
  todo:{
    id: 001,
    description: "hello world todo"
  }
})

store.dispatch({
  type: "ADD_GOAL",
  todo:{
    id: 002,
    description: "hello world again",
    complete: false
  }
})
