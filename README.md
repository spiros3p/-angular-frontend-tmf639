# Radio-Management-Server-thesis
## Summary
This application has been developed for the purpose of a thesis of an undergraduate student studying at the department of Electrical and Computer Engineering of the University of Patras (UoP).    
Its purpose is to serve a front-end application that communicates, through a protected Reverse-proxy server, with a Web Service that manages gNodeB (*5G antennas*) using the [TMF639](https://www.tmforum.org/resources/specification/tmf639-resource-inventory-management-api-rest-specification-r17-0-1/) API model.      
For that a reason the present Angular application (*/frontend*) along with the present Nodejs (*/backend*) for authorization and reverse-proxy have been developed.     
The below infographic represents the whole system and the green bordered boxes address the applications developed for the purpose of the thesis.
     
![system architecture Diagram drawio](https://user-images.githubusercontent.com/16209859/171468438-6dab92fa-4ae0-4af4-bd39-3c1e9c52addc.png)

The present repository consists of 2 submodules (*repositories*)
* an Angular Frontend application found [here](https://github.com/spiros3p/angular-frontend-tmf639) 
* and a NodeJS - Express backend application found [here](https://github.com/spiros3p/nodejs-AuthAPI/)
* in order to have complete functionality, we use the [JSON-SERVER](https://github.com/typicode/json-server) for a mock REST API server that serves the resources, since developing that backend application was not part of my work.     

## Initialization
* Download/clone the repository on your local system using the flag --recursive (*to download the content of both submodules*)     
`git clone --recursive https://github.com/spiros3p/Radio-Management-Server-thesis.git`

### Prerequisites
* Have **Node.js** and **NPM** [installed](https://nodejs.org/en/download/) on your system.
* Have **Angular (12.2.7)** [installed](https://angular.io/guide/setup-local) on your system: `npm install -g @angular/cli@12.2.7`
* (*Optional*) Have **Docker** [installed](https://www.docker.com/get-started) on your system.

### Manual Setup
#### Angular app - Frontend
1. Navigate to ***./frontend*** directory
2. RUN `npm install`
3. Edit file ***./frontend/src/app/router/app-routing.module.ts***  
by commenting out the desired block of code that defines the `const appRoutes`     
`canActivate: [AuthGuard]` protects the routes using  ***./backend*** server of this project.
4. (*Optional*) RUN `npm run server` on ***./frontend*** directory     
**Starts** a local [JSON-SERVER](https://github.com/typicode/json-server) (fake RestAPI) at port 5000 that serves your [TMF639](https://www.tmforum.org/resources/specification/tmf639-resource-inventory-management-api-rest-specification-r17-0-1/) specification based Resources.     
   - Edit ***./frontend/package.json - line 10*** to change port or uninstall the module.
   - ***./frontend/json-server/db.json*** file contains the dummy Resources that are being served.
5. Edit files 
   - For **Development** build ***./frontend/src/environments/environment.ts*** 
   - For **Production** build ***./frontend/src/environments/environment.prod.ts***    
     - **Define** the following variables according to your own servers and ports that RUN the server for the Resources (*here JSON-SERVER port 5000*) and the server for the user Authorization/reverse-proxy (*here the nodejs server in the ./backend directory at port 3000*).
     - You can still use direct connection between the Front end and the Web Service serving the Resources by filling the apiURL variable or leaving it empty for the Reverse-Proxy to do the job.
6. Start the Angular application on the ***./frontend*** directory  
   - For **Development** RUN `ng serve` 
   - For **Production** RUN `ng build` ([compiles](https://angular.io/cli/build) the angular app) and drop your build into your own production server
7. Angular app is ready and running at [http://localhost:4200/](http://localhost:4200/)
   - if you chose to use the `canActivate: [AuthGuard]` routes, at step  **3.**, you landed at a login page and you have to move to step **8.** to continue setup.     
![image](https://user-images.githubusercontent.com/16209859/154483016-cf7180bb-2f24-4a16-a5c0-c8dbe3774333.png)
   - if you chose to **NOT** use the `canActivate: [AuthGuard]` routes you are **DONE**     
![image](https://user-images.githubusercontent.com/16209859/154483481-a650e98a-286d-4982-bebd-b65f1756774d.png)
#### Nodejs app (authorization/user restAPI) - Backend 
8. Navigate to ***./backend*** directory
9. RUN `npm install` (*you may need to RUN `npm install bcrypt` separately in some occasions*)
10. RENAME ***./backend/.env-example*** file to ***./backend/.env***
11. EDIT the same ***./backend/.env*** file     
    - Define your existing **MySQL** database connection settings (_if you dont have one see the **docker setup** of the project further below to setup one_).
    - Define SESSION_SECRET to protect the sessions created by [PassportJS](https://www.passportjs.org/) in the present Express NodeJS app.
    - Define FRONT_END_IP as the IP and Port where the **Angular app - frontend** is running (*this is needed to allow the certain IP to exchange cookies between the nodeJS app and the Angular app*)  
    ![image](https://user-images.githubusercontent.com/16209859/157508498-66394a24-0f18-4d6e-8700-5a8199f4273f.png)
12. Navigate to your MySQL db _(own or see docker setup to use one)_ and copy the table ***./backend/db/tbl_users.sql*** inside the **MySQL** Database defined at `DB_DATABASE` previously.     
13. Start the NodeJS application on the ***./backend*** directory (*Runs at Port 3000*) 
    - For **Development** RUN `npm run watch` (*to run the app with Nodemon. This will restart the app at every save.*) 
    - For **Production** RUN `node app.js`
14. **Voila!** You can navigate to [http://localhost:4200/](http://localhost:4200/) and login with the existing users (*admin* and *test* - found in the table file you copied at step 12.) or create a new one
   
### Setup using Docker (docker-compose)
Using docker to run the app will start 5 different containers
* **Angular app** running at port 4200
* **JSON-SERVER** (*mock Resources server API*) running at port 5000
* **NodeJS app** (*auth/user/reverse-proxy API*) running at port 3000
* **MySQL database** running at defualt port 3306
* **phpMyAdmin app** running at port 5001     

You can edit files and comment out any application you dont want the docker to run:
   - For **Development** build ***./docker-compose.yml*** 
   - For **Production** build ***./docker-compose.prod.yml***
  
1. RENAME ***./.env-example*** file to ***./.env***
2. EDIT the same ***./.env*** file (like previously at step **11.**)
   - Default DB is using root user - MySQL Docker image is not creating another one.
   - Define everything like before (*these variables will be used in the mysql docker image to setup the database and also in the nodejs app to connect to the db*)
   - `FRONT_END_IP` depends on whether you are running it on your local machine or remote server. In the case of a remote server you need to use the external IP of the machine.
   - `PROXY_IP` is used in the NodeJS application to target the Web Service that serves the resources. Even at development you may need to use the network's IP of your machine to target the application correctly.
3. Same like step **3.** before at manual setup
4. Same like step **5.** before at manual setup
5. RUN the docker-compose file in the root directory:     
   - For **Development** RUN `docker-compose -f docker-compose.yml up --build -d`
   - For **Production** RUN `docker-compose -f docker-compose.prod.yml up --build -d`
6. Make sure you navigate to [http://localhost:5001/](http://localhost:5001/) and copy the table ***./backend/db/tbl_users.sql*** inside the running MySQL application defined `DB_DATABASE`
7. Voila! The full application is app and running at [http://localhost:4200/](http://localhost:4200/)
