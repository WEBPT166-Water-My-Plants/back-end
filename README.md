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

POST /api/users/:id/plants  
Allows authenticated user to create plant object  

Request  

    `Axios.post('https://plant-tender.herokuapp.com/api/users/:id/plants', {
        id: '',
        nickame: 'planty_mcplantface',
        species: 'plant',
        h2oFrequency: 'daily'
    })` 

Response  

    `{
        id: '',
        nickame: 'planty_mcplantface',
        species: 'plant',
        h2oFrequency: 'daily'
    }`

### Update Plants  

PUT /api/users/:id/plants  
Allows authenticated user to update/edit plants in list  

Request  

    `Axios.put('https://plant-tender.herokuapp.com/api/users/:id/plants')
    `  

Response  

    `{
        WIP
    }`  

