# Assignment 2 - Web API.

Name: Jiacheng Shen

## Features.

...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,
 
 + Feature 1 - more than 3 new API endpoint.
 + Feature 2 - custom API Documentations with Swagger.
 + Feature 3 - mongo integration.
 + Feature 4 - Basic Authentication and protected routes.
 + Feature 5 - Link some of API endpoints  with my assignment1.
 + Feature 6 - Minimal React integration(GET and POST data to API).
 + Feature 7 - Custom validation using Mongoose.

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 

Describe getting/installing the software, perhaps:

```bat
git clone https://github.com/SJC1109/movies-api
```

followed by installation

```bat
git install
```
```bat
npm install -save mongoose
```
```bat
npm install --save express-session 
```
start MoviesApp
```bat
npm start
```

## API Configuration

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
mongoDB=mongodb+srv://SJC1109:<password>@cluster0.j2dk5.mongodb.net/<dbname>?retryWrites=true&w=majority
seedDb=true
secret=<JWTtoken>
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/nowplaying | Get nowplaying movies | N/A | N/A | N/A
| /api/Peoples | Get a list of people | N/A | N/A | N/A
| /api/Peoples/{peoplesid} | Get details of a person | N/A | N/A | N/A
| /api/users | Gets all users | Register or authenticate a user | N/A | N/A
| /api/users/{userid} | N/A | N/A | Update a user | N/A
| /api/users/{userName}/favourites | Get user favourite movie list | post a movie to favourite list | N/A | N/A

If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).


## Security and Authentication
The system uses the passport policy to validate the Bearer token in advance without session. Users must enter the correct username and password to access the protected page
+ protected routes :
  +  /api/movies(moviesRouter) 
  + /api/nowplaying (nowplayingRouter)

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

~~~Javascript
export const login = (username, password) => {
    return fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password) => {
    return fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const getMovies = () => {
    return fetch(
       '/api/movies',{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };
export const getNowplaying = () =>{
    return fetch(
        '/api/nowplaying',{headers: {
            'Content-Type': 'application/json'
     }
   }
   ).then(res => res.json());
};
  export const getPeoples = () => {
    return fetch(
       '/api/Peoples',{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

~~~

## Extra features

+ Feature 1 - Web form.
+ Feature 2 - Extensive data hyperlinking.

## Independent learning.

Swagger: in the assignment, I use some knowledge about swagger.



# Assignment 2 - Agile Software Practice.

Name: Jiacheng Shen

## Target Web API.

...... Document the Web API that is the target for this assignment's CI/CD pipeline. Include the API's endpoints and any other features relevant to the creation of a suitable pipeline, e.g.

+ Get /api/movies - returns an array of movie objects.
+ Get /api/movies/:id - returns detailed information on a specific movie.
+ Put /api/movies/:id - update a specific movie. The request payload includes the some/all of the following movie properties to be updated: title, genre list, release date.
+ Post /api/movies - add a new movie to the database.
+ Get /api/nowplaying - returns an array of nowplaying movies.
+ Get /api/peoples - returns a list of people. 
+ Get /api/peoples/{peoplesid} - returns a list of people. 
+ Get /api/users - returns a list of all the users.  
+ Put /api/users/{userid} - update a user. 
+ Get /api/users/{username}/favourites - get user facourite movie list. 
+ Post /api/users/{username}/favourites - post a movie to favorite list. 

## Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

+ Post /api/movies - test when the new movie has no title, invalid release date, empty genre list. Test adding a movie without prior authentication. See tests/functional/api/movies/index.js 
+ Get /api/movies - test  movies list when the token is valid and invalid(when unauthorized).
+ Get /api/movies/{movieid} - test get matching movies when the movieid is valid and invalid.
+ Get /api/peoples - test people list when the token is valid and invalid.
+ Get /api/{peoplesid} - test get specific person when the personid is valid and invalid.
+ Get /api/users - test users list
+ Post /api/users - test create a user with a correct username and invalid password, and test a user with correct username and password.
+ Put /api/users/{userid} - test update user.
+ Get /api/users/{userName}/favourites - test get users favourites list with vaild username

## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

+ https://movies-api-stageing.herokuapp.com/ - Staging deployment
+ https://movies-api-master.herokuapp.com/ - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![][stagingapp]

+ Production app overview 

![][productionapp]

[stagingapp]: ./img/stagingapp.png
[productionapp]: ./img/productionapp.png

