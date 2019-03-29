NOTE: Not meant for MOBILE
DONT FORGET to npm install

run the app options----------------

Npm run test --- This is the easiest way to view the app --- it will open the development server automatically. When running development server Webpack will bundle the modules together but will not write it to a file on disk. It will automatically inject the bundle.js to the html. It is more or less streaming the files.

Npm run dev --- will do bundling and save on disk and WILL NOT 
MINIFY files 

npm run build --- will do bundling and save on disk and WILL MINIFY the files - for deployment

Npm run start --- is what i needed for me to deploy on heroku

This app uses a configured webpack. It uses babel and HtmlWebpackPlugin to bundle the files and inject the bundle.js/js file into the dist folder. 

Follows a MVC - Model View Controller architecture

seperates the presentation logic from the application logic with a controller in bewtween to control the entire app. Implemented with es6 modules

Model- data and apps logic 
Controller- index.js - brings the two together
View- gets and displays data from and to the user interface

This project consists of:

Webpack/configuration---
Babel/configuration---
Object Oriented Programming---
MVC---
ES6 Modules---
Default and named exports and imports---
APIs/API keys - used food2fork API---
Aync Function / Await---
Axios - http request - try/catch ---
ES6 Teamplate Strings---
Adanced DOM Manipulation Techniques---
Local Storage---
Node.js / express---
Deployed to HEROKU