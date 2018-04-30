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

  // interfaces
  // 3. provide a way to get access to the state variable
  const getState  = () => state

  // 4. provide a way to listen for changes on the state


  // return an object to the user containing the stores' interface properties 
  return {
    getState
  }
}
