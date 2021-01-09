# back-end
---
## Base URL - https://plant-tender.herokuapp.com/
---
## Server Info
---
### Get Users

GET /api/auth/users  
Returns a list of all users  

Request  
`Axios.get('https://plant-tender.herokuapp.com/api/auth/users')`  

Response  

    `[ 
        {
            "id": 1,
            "username": "user01",
            "phone": 9998675309,
            "password": "password"
        }
    ]`  

---  

## Authentication Routes  
---
### User Sign In  

POST /api/auth/login  
Authenticates user credentials, returns JSON object with token  

Request  

    `Axios.post('https://plant-tender.herokuapp.com/api/auth/login', {
        username: 'frodo',
        password: 'baggins'
    })`  

Response  

    `{
        "username": "frodo",
        "password": "baggins"
    }`  

### User Registration  

POST /api/auth/register  
Authenticates user credentials, returns JSON object with token  

Request  

    `Axios.post('https://plant-tender.herokuapp.com/api/auth/register', {  
        username: 'bilbo',  
        password: 'baggins'  
    })`  

Response  

    `{  
        "username": "bilbo",
        "phone": "9999999999",
        "password": "baggins
    }`  
  
  ### Add New Plants  

POST /api/users/:userId/plants  
Allows authenticated user to create plant object  

Request  

    `Axios.post('/api/users/:userId/plants', {
        nickame: 'planty_mcplantface',
        species: 'plant',
        h2oFrequency: 'daily'
    })` 

Response  

    `[
        {
            "id": 4,
            "userId": 4,
            "nickname": "plant",
            "species": "tomato",
            "h2oFrequency": "daily"
        }
    ]`  

### View Plants List  

GET /api/users/:userId/plants  
Allows authenticated user to view their list of plants  

Request  

    `Axios.get(/api/users/:userId/plants)`  

Response  

    `[
        {
            "id": 4,
            "userId": 4,
            "nickname": "string",
            "species": "string",
            "h2oFrequency": "string"
        },
        {
            "id": 5,
            "userId": 4,
            "nickname": "string",
            "species": "string",
            "h2oFrequency": "string"
        }
    ]`

### Update Plants  

PUT /api/users/:userId/plants/:id  
Allows authenticated user to update/edit plants in list  

Request  

    `Axios.put('/api/users/:userId/plants/:id', {
        nickname: 'string',
        species: 'string',
        h2oFrequency: 'string'
    })`  

Response  

    `{
        [
            {
                "id": 4,
                "userId": 4,
                "nickname": "string",
                "species": "string",
                "h2oFrequency": "string"
            },
            {
                "id": 5,
                "userId": 4,
                "nickname": "string",
                "species": "string",
                "h2oFrequency": "string"
            }
        ]
    }`    

### Delete Plants  

DELETE /api/users/:userId/plants/:id
Allows authenticated user to delete plants from their list.

Request  

    `Axios.delete(/api/users/:userId/plants/:id)`  

Response  

    `{
        "message": "Delete successful"
    }`