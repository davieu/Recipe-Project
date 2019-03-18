DONT FORGET to npm install

run the app options----------------

Npm run start --- This is the easiest way to view the app --- it will open the development server automatically. When running development server Webpack will bundle the modules together but will not write it to a file on disk. It will automatically inject the bundle.js to the html. It is more or less streaming the files.

Npm run dev --- will do bundling and save on disk and WILL NOT MINIFY files 
npm run build --- will do bundling and save on disk and WILL MINIFY the files - for deployment
