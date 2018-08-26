Create a Server and Client React starter package:

- create express server
- create api route
- create react client
- add component to present the results of the default api
- setup npm scripts to start both client and server using concurrently

step 1 - install dependencies:

- install express using :
  npm install --save express
- install concurrently using:
  npm install --save concurrently
- install nodemon as dev dependency only using:
  npm install --save-dev nodemon
- change the starter scripts as follows:
  remove: "test"
  add: "start": "node server.js"
  add: "server": "nodemon serer.js"
  (this will allow to run the server while in development mode without restarting the server for every change)

Step 2 - Create the Server

- A basic server that will have only one route to server.
- It will be defaulted to port 5000 (different than then default React-Create-App port of 3000).
- create server.js file in the main folder, and add the following lines:

  const express = require('express');

  -- create an app instance and initialize express

  const app = express();

  -- create a port variable

  const port = 5000;

  -- create the server

  app.listen(port, () => console.log(`Server started on port ${port}`));

  -- add the route before the port assignment:
  (This should be replaced by an api that will extract information from a db.
  The information should be served from a MongoDb, MySQL, or any other db.)

  api.get('\api\customers\, (req, res, next) => {
  customers = [
  {id: 1, firstName: "John", lastName:"Doe"},
  {id: 2, firstName: "Mark", lastName:"Done"},
  {id: 3, firstName: "Merry", lastName:"Jane"}
  ];
  res.jason(customers);
  });

Step 4: Start server

- using the nodemon we can start the server.

npm run server

- open browser in the following url: http://localhost:5000/api/customers
  and a json line with all the customers info we defined as the default route, are listed there.

  [{"id":1,"firstName":"John","lastName":"Doe"},{"id":2,"firstName":"Mark","lastName":"Done"},{"id":3,"firstName":"Merry","lastName":"Jane"}]

Step 5: Create client

- install globally create-react-app module using:

npm install -g create-react-app

- in the root folder of the project create the client react app:

create-react-app client

- in order to reference the back-end serer in the client application, we need to add the proxy info in the package.json client file. This will allow not to reference the exact server in each of the routes and use the routes regardless of the server location. Add the following after the 'script' section in the file:

"proxy": "http://localhost:5000"

- start the react server (within the client folder) using:

npm start

- this will open a new browser window and will open the http://localhost:3000 location to show the react app that was created.

Step 6: Create a customer component based on the API data

- create a folder 'components' in the 'src' folder
- create a 'customers' folder in the 'components' folder
- create an 'index.js' file that will have the Customers component definition as:

  import React, {Component} from 'react';

  class Customers extends Component {
      render() {
          return (
              <div >
                  <h2 >Customers</h2>
              </div >
          )}
  }

  export default Customers;

- then remove the <p> section from the 'app.js' file and add:
  import Customers from './component/customers'; (in the import section)

  <Cusotmers /> (instead of the <p> section)

  this will present 'Customers' on the main application page.

  - Back in the 'index.js' of the Customers component we will now add the fetch data from the api.
  - Add a constructor that will initiate the state for the component with an empty array for the customer data:

    constructor() {
      super();
      this.state={
        customers: [],
      }
    }

 - Using the component life cycle 'componentDidMount', to make sure to fetch the data after the component was rendered on the DOM, as fetch is async action , we add the fetch data from the api:

  componentDidMount(){
    fetch('/api/customers/')
    .then(res => res.json)
    .then(customers => this.setState({customers: customers}, () => console.log('Customers fetched..',customers)))
  }  

  - this should not make any change in the app view, but it will provide a feedback on the console that will list the results from the default api.

  - now we present the results from the api on the component as follows:

  <ul>
    {this.state.customers.map(customer => <li key={customer.id}>{customer.firstName} {customer.lastName</li>)}
  </ul>

  - change the style of the list by adding a css file:
    - in the 'index.js' (customers) add:
    
      import './customers.css'

    - create a customers.css file with the following entries:

    ul {
    list-style: none;
    padding: 0;
    width: 30%;
    margin: auto;
    }

    li {
    font-size: 1.3rem;
    line-height: 2rem;
    border-bottom: 1px solid #777;
    } 

    this will render the fetched list in a nicer way on the page.

Step 7: arrange the scripts

- instead of starting server and the client in two different terminal windows, we will use 'concurrently' module that allows to execute several scripts.
- first we need to create a new entry to start the client server.
- in the 'package.json' file on the root folder of the project add:

  "client": "npm start --prefix client"

  this will start the client server within the 'client' folder.

- for development purposes will use the 'concurrently' module to start both servers:

  "dev": "concurrently \"npm run server\" \"npm run client\""

  in order to start both use:
  
    npm run dev


