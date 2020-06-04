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
