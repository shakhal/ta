# ta

This is a small demo app that shows #trump tweets.  
It is made of two projects, both in node.js.  
Server side under / (root dir) - runs on port 3001  
and Client side project under /client - runs on port 3000  
  
Client side is based of react-starter-kit  
https://github.com/kriasoft/react-starter-kit  

Instructions:
- clone the repo  
     - $ git clone https://github.com/shakhal/ta.git

Server side (api):
- install packages
     - $ npm install 

Client side:
- install packages
     - $ cd client
     - $ npm install


To run in development mode:
- Run server side 
     - $ npm start

- Run client side
     - $ cd client
     - $ yarn start

- Browse to: http://localhost:3000/  (client side project, auto updates as you edit)

To run in production mode:  
- Run server side 
     - $ npm start
- Browse to: http://localhost:3001/  (server side serves the built client side code statically)

To built the client project:
- $ cd client 
- $ yarn run build


