# LAB: Authentication Server

We make use of base-64, jsonwebtoken, bcrypt, mongoose and our files to make sure we settup two paths: 

- We need to navigate to /signup to create a new user

- We need a /signin to verefy we can use our password and username to log in

- There is a need for a /users to retrieve our users from db

Aditional instruction srequire that we save a nique username, and also hash paswords.

### UML

![UML](https://github.com/401Repo/authentication/blob/main/Image%20from%20iOS%20(1).jpg)

The UML shows that we need to navigate these routes or we will get an error. Also, the router needs to have a authentication middleware, and on signing up the schema calls for a unique name (as in not already in the db) or we will get an error.

Also, in signing in, we get a need to decript and validate a password to a hashed saved value in db or we will throw an error.

### TDD

#####  My test so far:
  
  Testing using Supergoose atm:
  
 -   ✓ lets use signup to create a new user. (64 ms)
 -   ✓ signin will login as a user (38 ms)
 -   ✓ A bad route will give me an error (4 ms)
 -   ✓ error when the signup route is hit with a bad input (9 ms)
 -   ✓ no input hits my 500 error


