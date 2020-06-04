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