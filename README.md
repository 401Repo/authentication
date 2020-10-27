# LAB: Authentication Server

We make use of base-64, jsonwebtoken, bcrypt, mongoose and our files to make sure we settup two paths: 

- We need to navigate to /signup to create a new user

- We need a /signin to verefy we can use our password and username to log in

- There is a need for a /users to retrieve our users from db

Aditional instruction srequire that we save a nique username, and also hash paswords.

### UML

![UML](https://github.com/401Repo/expressRouter/blob/main/UML.jpg?raw=true)

The UML shows that we need to navigate these routes or we will get an error. Also, the router needs to have a authentication middleware, and on signing up the schema calls for a unique name (as in not already in the db) or we will get an error.

Also, in signing in, we get a need to decript and validate a password to a hashed saved value in db or we will throw an error.

### TDD

#####  tests the product controller and data layer
  
  Testing using Supergoose atm:
  
-    ✓ should return a new product "Candy" on POST /product (41 ms)
-    ✓ should return 1 product by id (13 ms)
-    ✓ should update a new product "Candy" to "Cookies" on Put /product (8 ms)
-    ✓ should return a new category "Electronics" on POST /category (4 ms)
-    ✓ should return 1 category by id (3 ms)
-    ✓ should be able 404 err message (2 ms)
-    ✓ Testing 500 error (1 ms)
-    ✓ should update a new category "Electronics" to "Coputers" 
-    ✓ should delete 1 category by id (5 ms)
-    ✓ should delete 1 product by id (4 ms)



