# BlogAPI

This project is an API and a database for the production of content for a blog!

An application Node.js using the package sequelizer make CRUD of posts that will be connected to your database following REST principles.

To make a post you need a username and login, so the relationship between user and post;

It will be necessary to use categories for the posts, working, thus, the relation of posts to categories and of categories to posts.

## with Docker.

Before you start, your docker-compose needs to be at version 1.29 or higher, to run the services node and db with the command docker-compose up -d --build.

Remember to stop mysqlif you are using it locally on the default port ( 3306), or adapt if you want to use the application in containers;

These services will initialize a container called blogs_apiand a container called blogs_api_db;

From here you can run the container blogs_apivia CLI or open it in VS Code;

information_sourceUse the command docker exec -it blogs_api bash.

It will give you access to the interactive terminal of the container created by compose, which is running in the background.
information_sourceInstall dependencies [ If any ] with npm install. (Install inside the container)

Attention: If you choose to use Docker, ALL commands available in package.json(npm start, npm test, npm run dev, ...) must be executed INSIDE the container, that is, in the terminal that appears after executing the command docker execmentioned above .

## Without Docker. 

Install dependencies with npm install. To run the project this way, you must have it nodeinstalled on your computer.

### Once running on your machine, use the software of your preference (postman, insonia, thuderbolt…) to interact with it’s endpoints.

## POST endpoint /login

The endpoint must be accessible via the URL /login;
The request body should follow the format below:

{
  "email": "lewishamilton@gmail.com",
  "password": "123456"
}

[It will be validated that it is not possible to login without all fields filled in]

If the request does not have all fields properly filled in (there cannot be blank fields), the result returned should be as shown below, with an http status 400:
{
  "message": "Some required fields are missing"
}
[It will be validated that it is not possible to login with a user that does not exist]

If the request receives a pair of wrong email/ passwordmissing es, the result returned should be as shown below, with an http status 400:
{
  "message": "Invalid fields"
}

[It will be validated that it is possible to login successfully]

If the login was successful the result returned should be as shown below, with an http status 200:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
}

Warning
The previous token is dummy, its token must be generated from the environment variable JWT_SECRET, from payloadthe request and must not contain the attribute passwordin its construction.

## POST endpoint /user

The endpoint must be accessible via the URL /user;
The endpoint must be able to add a new one userto its table in the database;
The request body should follow the format below:

{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

[It will be validated that it is not possible to register with the field displayNameshorter than 8 characters]

If the request does not have the field displayNameproperly filled in with 8 characters or more, the result returned should be as shown below, with an http status 400:

{
  "message": "\"displayName\" length must be at least 8 characters long"
}

[It will be validated that it is not possible to register with the field emailwith an invalid format]

If the request does not have the field emailproperly filled in with the format <prefixo@dominio>, the result returned should be as shown below, with an http status 400:

{
  "message": "\"email\" must be a valid email"
}

[It will be validated that it is not possible to register with the field passwordshorter than 6 characters]

If the request does not have the field passwordproperly filled in with 6 characters or more, the result returned should be as shown below, with an http status 400:

{
  "message": "\"password\" length must be at least 6 characters long"
}

[It will be validated that it is not possible to register with an existing email]

If the request sends the field emailwith an email that already exists, the result returned should be as shown below, with an http status 409:

{
  "message": "User already registered"
}

[It will be validated that it is possible to register a user successfully]

If the user is successfully created the result returned should be as shown below, with an http status 201:

  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  
Warning
The previous token is dummy, its token must be generated from the environment variable JWT_SECRET, from payloadthe request and must not contain the attribute passwordin its construction.

## GET endpoint /user

The endpoint must be accessible via the URL /user;
The endpoint must be able to pull everything usersfrom the database;

[It will be validated that it is possible to list all users]

Upon successfully listing users the result returned should be as shown below, with an http status 200:

[
  {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },

]

##  GET endpoint/ user/:id

The endpoint must be accessible via the URL /user/:id;
The endpoint must be able to retrieve the userbased on idfrom the database if it exists;

[It will be validated that it is possible to list a specific user successfully]

Upon successfully listing a user the result returned should be as shown below, with an http status 200:

{
  "id": 1,
  "displayName": "Lewis Hamilton",
  "email": "lewishamilton@gmail.com",
  "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
}

[It will be validated that it is not possible to list a non-existent user]

If the user does not exist, the result returned should be as shown below, with an http status 404:

{
  "message": "User does not exist"
}

## POST endpoint /categories

The endpoint must be accessible via the URL /categories;
The endpoint must be able to add a new category to its table in the database;
The request body should follow the format below:

{
  "name": "Typescript"
}


[It will be validated that it is not possible to register a category without the field name]

If the request does not have the field nameproperly filled in (there cannot be a blank field), the result returned should be as shown below, with an http status 400:

{
  "message": "\"name\" is required"
}

[It will be validated that it is possible to register a category successfully]

If the category is created successfully the result returned should be as shown below, with a status of http 201:

{
  "id": 3,
  "name": "Typescript"
}

## GET endpoint /categories

The endpoint must be accessible via the URL /categories;
The endpoint must be able to retrieve all categories from the database;

[It will be validated that it is possible to list all categories successfully]

Upon successfully listing categories the returned result should be as shown below, with an http status 200:

[
  {
      "id": 1,
      "name": "Inovação"
  },
  {
      "id": 2,
      "name": "Escola"
  },

]

## POST endpoint /post

The endpoint must be accessible via the URL /post;

The endpoint must be able to add a new blog post and link it to the categories in its tables in the database;

The request body should follow the format below:

{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
}

[It will be validated that it is not possible to register without all fields filled in]

If the request does not have all fields properly filled in (there cannot be blank fields), the result returned should be as shown below, with an http status 400:

{
  "message": "Some required fields are missing"
}

[It will be validated that it is not possible to register a blogpost with a non- categoryIdsexistent one]

If the request does not have the field categoryIdsproperly populated with an array with at least one category that exists, the result returned should be as shown below, with an http status of `400``:

{
  "message": "\"categoryIds\" not found"
}

[It will be validated that it is possible to successfully register a blogpost]

If the blog post is created successfully the result returned should be as shown below, with an http status 201:

{
  "id": 3,
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "userId": 1,
  "updated": "2022-05-18T18:00:01.196Z",
  "published": "2022-05-18T18:00:01.196Z"
}

## GET endpoint/ post

The endpoint must be accessible via the URL /post;
The endpoint must be able to retrieve all blog posts, user owner and categories from the database;

[It will be validated that it is possible to successfully list blogpost]

Upon successfully listing posts the result returned should be as shown below, with an http status 200:

[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  },

]

## GET endpoint /post/:id

The endpoint must be accessible via the URL /post/:id;
The endpoint must be able to retrieve the blog post based on idthe one from the database if it exists;

[It will be validated that it is possible to successfully list a blogpost]

Upon successfully listing a post the returned result should be as shown below, with an http status 200:

{
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
      {
          "id": 1,
          "name": "Inovação"
      }
  ]
}

[It will be validated that it is not possible to list a non-existent blogpost]

If the post is non-existent the returned result should be as shown below, with an http status 404:

{
  "message": "Post does not exist"
}

## PUT endpoint /post/:id

The endpoint must be accessible via the URL /post/:id;
The endpoint must be able to change a post from the database, if it exists;
Your application should only allow you to change a blog post if the person owns it;
titleYour application should not allow you to change the post categories , only the attributes contentcan be changed;
The request body should follow the format below:

{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}

[It will be validated that it is not possible to edit a blogpost with another user]

Only the user who created the blog post will be able to edit it, the result returned should be as shown below, with an http status401

  {
    "message": "Unauthorized user"
  }
  
[It will be validated that it is not possible to edit without all fields filled in]

If the request does not have all fields properly filled in (there cannot be blank fields), the result returned should be as shown below, with an http status 400:

{
  "message": "Some required fields are missing"
}

[It will be validated that it is possible to edit a blogpost successfully]

If the blog post is successfully changed the result returned should be as shown below, with an http status 200:

{
  "id": 3,
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "userId": 1,
  "published": "2022-05-18T18:00:01.000Z",
  "updated": "2022-05-18T18:07:32.000Z",
  "user": {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
    {
      "id": 1,
      "name": "Inovação"
    },
    {
      "id": 2,
      "name": "Escola"
    }
  ]
}






 
