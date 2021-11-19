# authentication-api
An example code that shows how to create an API that will authenticate users in MongoDB and return a JWT

$npm start

Following API's are available

    POST http://localhost:2240/api/auth/signup
        JSON Body {
            "email": "******",
            "password": "***"
        }
    POST http://localhost:2240/api/auth/login    : 
        JSON Body {
            "email": "******",
            "password": "***"
        }
    GET  http://localhost:2240/api/auth/jwt-test : Requires Authorization Token
