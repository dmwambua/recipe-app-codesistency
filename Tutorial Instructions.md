Tutorial
Youtube: https://www.youtube.com/watch?v=fLIl6jypzkI&t=716s
GitHub Repo: https://github.com/burakorkmez/react-native-recipe-app
Gists https://gist.github.com/burakorkmez/11bc1e5939bcc8d0a4b2f6bf1c2c6a3d
free icons used in this tutorial https://www.thiings.co/things
free icons elsewhere https://www.flaticon.com/free-icons/things 
Udemy course https://www.udemy.com/course/the-web-dev-bootcamp/?couponCode=DA64BA3F36F6D786D143
The Meal DB https://www.themealdb.com/api.php 
Progress: Minute 3:56.10


Basics
npm run dev to RUN
tree - To see the directory tree. This is a function of Homebrew use brew install tree
http://localhost:3000/favorites PORT

Web Resources

https://neon.com/ - Postgres serverless database is provided by neon
https://app.eraser.io/dashboard/all- For database relationship diagram, use eraser.com
Drizzle-orm - (Object Relational Mapping) used to communicate with database (CRUD - create, read, update, delete)
npx drizzle-kit generate to generate schema migrations (versioned change to the database)
https://www.postman.com/ postman for testing API
https://dashboard.clerk.com/apps Clerk for authentication
https://render.com/ render.com instead of renting and managing a Virtual Private Server (VPS) render manages VPS, Postgres and offers automatic deployments, SSL, Security patches and maintenance i.e. it is a Platform as a Service (PaaS).


Other resources/ Kenyan options
https://truehost.co.ke/cloud/store/vps-hosting self managed servers, includes MPESA payments
https://novahost.co.ke/ Novahost
https://supabase.com/pricing alternative for managed service
https://www.hostpinnacle.co.ke/ HostPinnacle
https://www.raycast.com/ helps command your computer like opening apps and camera

Tricks
If autosuggest does not work well, you can reload vscode window by CMD+Shift and typing reload window

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
deploy in render.com create a new web service, render will ask where you want to get the repo from and you can choose GitHub, Install. Check the Build command (can use npm install) and the Start command (can use npm run start) depending on what is in the package.json. if build fails, make sure that package.json is in the root directory, and direct render (in settings) to where the root directory is, e.g backend. Retry the build. in this case, had to change start command to node src/server.js. Render will give a hotlink for the online version, you may see cannot GET/, You need to test with the data that is already on neon/database with user, e/g/ https://recipe-app-codesistency.onrender.com/api/favorites/1231 to get a result.

Render free tier becomes inactive after 15 minutes, CRON jobs can be used to send a request every so often to keep the API active. cron is already in package.json since we installed it.
Create cron.js in config add the cronJob expression. ("*/14 * * * *", function () note that the / means "every"
You need to add the API_URL shown on render as a new environment variable for this part of the code to work - be sure to specify the api to be called, e.g  .get(process.env.API_URL, (res) => {

Take home message: We are using Express JS as our backend API language. It has a shorter learning curve, however, if an app will include many user roles, filtering, a larger dev team and payments, it is better to use NestJS in the backend for APIs.

Front End
npx create-expo-app@latest .
the . at the end says install in current folder
npm run reset-project to delete the extra stuff that you don't need
npx expo to start
remove inline styles and create a stylesheet and point the inline styles to the stylesheet (this can later be moved to its own file)

created an /about page
installed ES7+React so I can run rnfe to create a react component
included SafeAreaView in layout
Styling is with the help of the tutorial gists
created styles folder in the assets folder and added in this folder the auth.styles.js file
created constants under mobile folder and inside constants created the color.js file. Colors.js contains theme colors and this is where you can go to change the app theme

Build out the Auth
Go to Clerk and create a project, in the project, configure>Native Applications
go to Expo, install Clerk. copy API Key and put it in a .env in the mobile folder. FYI: we already had this key in the backend so we just moved it
wrap _layout with Clerk and added <Slot/>, npm install expo-secure-store
Under app, create (auth) for authentication files. Use bracketsdenoting route group - parenthesis lets you organize related screens (such as all auth screens: login, register, etc) without adding (auth) into your app's URL path.
For example, /login can live inside app/(auth)/login.tsx—and remain just /login at runtime. If you didn’t use parentheses and made a folder called auth, your URL would be /auth/login.
use rnfe to set up the (tabs) files like index.jsx. _layout.jsx. and the (auth) files including _layout.jsx. sign-in.jsx sign-up.jsx and verify-email.jsx. pay special attention to redirection in the _layout.jsx files
complete the signup page which includes email and password text areas and button for Signin as well as a signUp link if users are not signed up already

Move on to the sign up page setup
At bottom of app where the tab icons appear there may be a color that doesnt match the rest of the app. To correct this, create a components folder and in it include a SafeScreen.jsx, essentially wrap the slot in layout using SafeScreen in order to dictate header and footer.

Created the mealAPI endpoints under services
Update index.js to include endpoints from the API

Develop index.jsx
create components for reusable features