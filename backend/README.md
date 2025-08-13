Basics
npm run dev to RUN
tree - To see the directory tree. This is a function of Homebrew use brew install tree
http://localhost:3000/ PORT

Web Resources
https://www.youtube.com/watch?v=fLIl6jypzkI&t=716s
Minute 51
https://neon.com/ - Postgres serverless database is provided by neon
https://app.eraser.io/dashboard/all- For database relationship diagram, use eraser.com
Drizzle-orm - (Object Relational Mapping) used to communicate with database (CRUD - create, read, update, delete)
npx drizzle-kit generate to generate schema migrations (versioned change to the database)
https://www.postman.com/ postman for testing API
https://dashboard.clerk.com/apps Clerk for authentication
https://render.com/ render.com instead of renting and managing a Virtual Private Server (VPS) render manages VPS, Postgres and offers automatic deployments, SSL, Security patches and maintenance i.e. it is a Platform as a Service (PaaS).


Other resourses/ Kenyan options
https://truehost.co.ke/cloud/store/vps-hosting self managed servers, includes MPESA payments
https://novahost.co.ke/ Novahost
https://supabase.com/pricing alternative for managed service
https://www.hostpinnacle.co.ke/ HostPinnacle


Sequence of events
Mobile app uses react native and expo, postgresql with drizzle as the ORM (Object Relational Mapping alternate would be prisma)
can use eraser to organize thoughts and database diagrams
create backend and mobile directories
cd into backend
npm install -y //for json file
npm install express@5.1.0 @neondatabase/serverless@1.0.0 cors@2.8.5 dotenv@16.5.0 drizzle-orm@0.44.2 cron@4.3.0 //for express, package-lock json, node modules and others
npm i nodemon -D //install as a dependency
create server.js under backend (minute 6.4) and edit package.json  for "dev": "nodemon server.js" and "start": "node server.js"
npm run dev to test
create src under backend
create .env file under src
create config directory under src
create env.js under src
write the code for server.js and test the API
npm i -D drizzle-kit
for serverless, create an account with neon then create a project
follow instructions to connect to database ad the database url in the .env
create db folder under src
create schema.js under db and add the table in the schema
create db.js under config
create drizzle.config.js file under backend
run npx drizzle-kit generate to generate migrations
run npx drizzle-kit migrate
now you should see the tables if you log into neon
create APIs within server.js using what is on the schema
test the API using postman
sign up for clerk for authentication
in clerk, use the expo SDK, copy the .env code and add it to .env
create a post api
on postman, create a delete function and send, this should delete the matched record on neon database
write a GET endpoint and test it on postman
deploy in render.com create a new web service, render will ask where you want to get the repo from and you can choose GitHub, Install. Check the Build command (can use npm install) and the Start command (can use npm run start) depending on what is in the package.json. if build fails, make sure that package.json is in the root directory, and direct render (in settings) to where the root directory is, e.g backend. Retry the build. in this case, had to change start command to node src/server.js







