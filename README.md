# express-api

 <--
create a new project folder
//install all dependencies

- npm init -y
- npm i express
- npm install express-handlebars
- npm install path --save 
- npm install node-fetch

- touch index.js index.hbs


---- 
index.js in main folder

- create lib folder, public folder, views folder 
- inside views create a layouts folder and partials folder
- move index.hbs and other main files (if you have any e.g. about etc.) into the views folder
- inside public create 'main.css'
- inside views > layouts create 'main.hbs' - this is the main file that will be served -
- inside lib create 'getplaceholder.js'for api fetching
- make sure nodemon is installed
- add "start": "nodemon index.js" to package.json under scripts     




--- index.js

//require files
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const getPlaceholder = require('./lib/getplaceholder');

//set variabes
const app = express();

//setting files in place
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views','layouts'),
    partialsDir: path.join(__dirname, 'views','partials')
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));

//pulling data from an api
app.get('/', async(req,res) => {
    let data = await getPlaceholder();
    //console.log(data);
    res.render('index', {data, listExists: true});
    });

    //which pages are accessible
    app.get('/about', (req,res)=>{
        res.render('about');
    });


    //error message if a page is not listed within the accessible pages
    app.get('*', (req,res)=>{
        res.render('404');
    });
    
//setting local server port
app.listen(3000, () => {
console.log("Listening to port 3000");
});


-----------
getplaceholder.js
const fetch = require('node-fetch');
const url = 'https://jsonplaceholder.typicode.com/users';

const getPlaceholder = async() => {
let data = await fetch(url);
//console.log(await data.json());
return await data.json();
}

//getPlaceholder();
//getplaceholder.js to fetch files from api

const fetch = require('node-fetch');
const url = 'https://api.spacexdata.com/v3/launches';
// const url = 'https://jsonplaceholder.typicode.com/users';

const getPlaceholder = async() => {
let data = await fetch(url);
//console.log(await data.json());
return await data.json();
}
    
//getPlaceholder();
module.exports = getPlaceholder;

-- getplaceholder.hbs
{{!-- fetch files from lib/getplaceholder & display files here then use >partials to display on front end --}}

<div class="people">
    <h2> Data from SpaceX</h2>
        {{#if listExists}}
               <p>This is pulling data dynamically from the SpaceX API regarding all SpaceX missions.</p>
               <br />

                {{#each data}}
                <div>
                    <p>Mission name: {{this.mission_name}}</p>
                    <p>Launch Year: {{this.launch_year}}</p>
                    <p>Rocket ID: {{this.rocket.rocket_id}}</p>

                    <br />
                </div>
                {{/each}}
           
        {{/if}}
</div>


-- getplaceholder.hbs pull data from api and display this as a partial on main.hbs
<div class="people">
    <h2> List of people</h2>
        {{#if listExists}}
            <ul>
                {{#each data}}
                    <li>{{this.name}}</li>
                {{/each}}
            </ul>
        {{/if}}
</div>

 -->