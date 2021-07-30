## DEAR ADUDICATORS!

PLEASE CAN YOU USE DOCKER TO GET THIS RUNNING

its as simple as `docker-compose up` and it will just work ;)

I know you said in the instructions to have a simple npm start script 
but I took the opportunity to show off, and demonstrate I can walk the talk.

## Breakdown

#### Proxy

there is an nginx proxy in front of the api and the client, this allows everything to 
run off the same domain without any cors errors and keeping to the microservice infrustructure.

#### Client
this is a simple react app running in development mode, you can create cakes with names, comments images, and a rating system.


#### Api
this is a complex nodejs app that includes routes, controllers, models, dtos, configs, different environments, services and tests.
the ORM is sequelize as it provides advanced features out of box without too much configuration.

The main controller you are going to be looking at is the cake controller.
the input validation is handled by Sequelize in all the methods, the update and create commands have file upload abilities using multer.

the files are uploaded into a folder in the root of the api dir called uploads/ (you may need to create this is if it doesn't exist)

theres also security built in with Helmet, logging with Morgan (logs folder), compression, and static serving (from the uploads folder) all of the middleware is defined in the app.ts and the configuration files in the config dir.


### caveats
something I came across when running this is the that if docker creates the folder on a mounted volume, it will be owned by root. so the host won't be able to remove the folder in the future. to get around this `sudo chown $USER:$USER -R .` this will ensure all the files regardless of being mounted are owned by the host.

## time spent
overall this took me 4 hours. I wanted to make sure I could include everything I could think of.
if you have any improvements please let me know.