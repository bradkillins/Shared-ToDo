# Shared-Todo

By Bradley Killins  
(and Andrew Miller)  
for SODV2201 - Web Programming

A To-do app that allows sharing between users.  
Frontend built with React.  
Backend built using node.js, express.js and connects to an Atlas MongoDb

# Setup

After cloning please run "npm install" to get required packages.  
The Backend **MUST** be using port **5000**, which is it's default port  
Currently the CORS policy on the backend is set so that request from localhost:5080  
will be allowed. If the frontend starts on a different port than **5080** you need  
to change the config file of the backend server.
