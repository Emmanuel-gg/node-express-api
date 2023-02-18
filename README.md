## TO DO ##
- 1) With a command initiates the database, creates the tables and fill it with data dummy.
- 2) Create a REST API with unit and integration tests.

## Solution ##
- 1) Using a node script with sequelize and his CLI, we can create the database, the tables and fill it with data dummy.
- 1.1) The script is in the folder `database/scripts` and the file is `init.js`
- 1.2) The script is executed with the command `npm run db:init -- [env]` [env] = dev | test | prod if not send gets the value from the .env in ENVIORMENT or default to dev
- 1.3) The script drops the database in case it exists, creates it, creates the tables and fill it with data dummy using faker and seeds of sequelize CLI.

## Posible improvements ##

- Pagination in all the endpoints
- Validate that only can exist one BuyerEvent purchase per transaction
-- server --
- Create a documentation of the API with swagger or postman
- Create a simple logger of the application
- Custom clases of error for every case (Not found, bad request, etc)

-- database --
- Let BuyerTransaction have many BuyerEvents
- Create a table buyerTransactionProduct to store the products of each transaction.
- Add status in every table for a soft delete.
- Add a table for the buyer types
- Add a table for the buyer events
- In the script of the init database
* Have an structure that if occurs an error, the script can rollback the changes and inform the user. 
* Also if the database already exists, the script can ask the user if he wants to drop the database and create it again.
* If the enviorement is prod not drop the database and not insert the data dummy.

## Problems ##
-- database --
- BuyerEvents doesn't recognize the association with BuyerTransaction
-- tests --
- I can't create the server one time and use it in all the tests

## Requirements ##
This are my specifications but its likely that you can run it with lower versions.
- Node v18 or higher
- NPM v9 or higher

## Installation ##
- Clone the repository
- Run `npm install` to install the dependencies
- Run `npm run db:init` to start the server
*   with `npm run db:init -- [env]` [env] = dev | test | prod if not send gets the value from the .env in ENVIORMENT or default to dev
- Run `npm run start` to start the server

