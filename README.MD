

Create a store from scratch. 

The steps to achieve that are described as comments within the store.js file. 

goal is to increase the predictability of state in the app and both the elements which make up the store (described below) as well as the rules that govern it (described at the bottom) ensure that.  

and setting up a central state store is essential as it can help us prevent duplication of state  amongst components that need/use them equally.

Building a state store in Redux - as well as our regular JS app in this project - comprises amongst others of a single  Object which encapsulates the state tree. 

reference to state tree here.

The state tree acts essentially as the central state repository for the whole app and therefore the single source of truth for all components. 

To communicate with the state three, components in our app will have to interface with it in at least three of the following ways:

1. getting the current state.
2. updating the state.
3. listening for changes on the state.

The three interfaces together with the state tree make up the actual data store of our app. 

Rules that will govern the store:

1. Only a recognised ACTION (event) can change the store's state. Every ACTION should have a "type" property.

  add ACTION code.

2. The function that returns the new state needs to be a PURE function. 

  - Return the same result if the same arguments are passed in
  - Depend solely on the arguments passed into them
  - Do not produce side effects


Link to pure fn explanation

