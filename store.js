// 1. define a factory function that creates an instance of the store.
function Store(){
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



  // return an object to the user containing the stores' interface properties 
  return {
    getState,
    subscribe
  }
}
