## GROUPOMANIA ##
BACKEND Installation
You need to install the last version of NodeJs which is NodeJs v17.6.0. Then clone the repository and run npm install.

## Usage ##
Run nodemon server for the backend server.

If your browser fails to launch, or shows a 404 error, navigate your browser to http://localhost:3000.

## DATA BASE ##
The data base is provided by Mysql.
You have to create a database named "database_development" with this command : CREATE DATABASE database_development;
And to use the database :USE database_development;

To see the tables you will have to create, open the backend side and the folder migrations.
On your terminal, run npx sequelize-cli db:migrate to create the table.
If the database is empty, create your first user in the database. This first user will be Admin, so isAdmin:true.

## ENVIRONMENTAL VARIABLES ##
Run npm install dotenv --save for the backend server. The file .env provides these environmental variables to access to my data base :
BD_USERNAME 
BD_SECRET_KEY 
BD_CLUSTER_NAME
BD_NAME 

## Images ##
Create a file named Images on your backend side.





