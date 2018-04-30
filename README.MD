
Create a store from scratch. 

The steps to achieve that are described as comments within the store.js file. 

Setting up central data stores is essential as it can help us prevebt duplication of data amongst components that need/use them equally. 

Building a data store in Redux - as well as our regular JS app in this project - comprises of a single  Object which encapsulates the state tree. 

reference to state tree here.

The state tree acts essentially as the central state repository for the whole app and therefore the single source of truth for all components. 

To communicate with the state three, components in our app will have to interface with it in at least three of the following ways:

1. getting the current state.
2. updating the state.
3. listening for changes to the state.

These three interfaces together with the state tree make up the actual data store of our app. 




