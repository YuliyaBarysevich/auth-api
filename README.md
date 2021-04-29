# LAB - Class 08  


## Project: Access Control

### Author: Yuliya Barysevich

### Links and Resources

1. Deployed with Heroku (2 routes) **/Currently I cannot deploy with mongoDB, trying to resolve it/**

    - [Heroku / Sign Up](https://barysevich-auth-api.herokuapp.com/signup)
    - [Heroku/ Sign In](https://barysevich-auth-api.herokuapp.com/signin)
    - [Heroku / api/v1/clothes route](https://barysevich-auth-api.herokuapp.com/api/v1/clothes)
    - [Heroku / api/v1/food route](https://barysevich-auth-api.herokuapp.com/api/v1/food)
    



2. Github URLs

    - [GitHub Pull Request](https://github.com/YuliyaBarysevich/auth-api/pull/1)
    - [GitHub Actions](https://github.com/YuliyaBarysevich/auth-api/runs/2464028236)
  
### User Stories 

1. **As a user, I want to create a new account so that I may later login**
    - Using a tool such as `httpie`, `postman`, or a web form:
    - Make a **POST** request to the `/signup` route with **username** and **password**
    - Your server should support both JSON and FORM data as input
    - On a successful account creation, return a 201 status with the user object in the body
    - On any error, trigger your error handler with an appropriate error

2. **As a user, I want to login to my account so that I may access protected information**
    - Using a tool such as `httpie`, `postman`, or a web form:
    - Make a **POST** request to the `/signin` route
    - Send a basic authentication header with a properly encoded username and password combination
    - On a successful account login, return a 200 status with the user object in the body
    - On any error, trigger your error handler with the message “Invalid Login”

3. **As a admin, I want Role Based Access Control (RBAC) using an Access Control List (ACL), allowing to not only restrict access to routes for valid users, but also based on the individual permissions we give each user.**
    - Regular users can `READ`
    - Editors can `READ`, `CREATE`, and `UPDATE`
    - Administrators can `READ`, `CREATE`, `UPDATE`, and `DELETE`


### Routes 

1. Auth Routes
    - POST /signup to create a user
    - POST /signin to login a user and receive a token
    - GET /secret should require a valid bearer token
    - GET /users should require a valid token and “delete” permissions

2. API Routes
    - POST /api/v1/:model -> CREATE a new item
    - GET /api/v1/:model/:id -> READ one item from DB
    - GET /api/v1/:model -> READ all items
    - PUT /api/v1/:model/:id -> UPDATE 1 item
    - DELETE /api/v1/:model/:id -> DELETE 1 item

3. 2. "Protected" API Routes
    - POST /api/v2/:model -> CREATE a new item ( require both a `bearer token` and the `create` capability)
    - GET /api/v2/:model/:id -> READ one item from DB (require `authentication` only,)
    - GET /api/v2/:model -> READ all items (require `authentication` only,)
    - PUT /api/v2/:model/:id -> UPDATE 1 item (require both a `bearer token` and the `update` capability)
    - DELETE /api/v2/:model/:id -> DELETE 1 item (require both a `bearer token` and the `delete` capability)



### Setup

- **.env requirements** 
i.e.
  - PORT - Port Number
  - MONGODB_URI = `mongodb://localhost:27017/bearer-auth`
  - SECRET = 12345

### How to initialize/run your application

- Download all dependencies `npm install`
- Create **.env** file and assign **PORT** variable to 3000, **MONGODB_URI** and **SECRET**
- Run command `nodemon` in terminal to start app on localhost:3333
- To run tests, run command `npm run test` in terminal

### Tests

1. 404 on a bad routes
2. AUTH Routes
    - POST /signup creates a new user and sends an object with the user and the token to the client
    - POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client
3. V1 (Unauthenticated API) routes
    - POST /api/v1/:model adds an item to the DB and returns an object with the added item
    - GET /api/v1/:model returns a list of :model items
    - GET /api/v1/:model/ID returns a single item by ID
    - PUT /api/v1/:model/ID returns a single, updated item by ID
    - DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found



### WRRC
