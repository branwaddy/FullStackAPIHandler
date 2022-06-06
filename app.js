import express from 'express';
import helmet from 'helmet';
import fetch from "node-fetch";
import cors from "cors";
const app = express();
app.use(cors());
app.use(helmet());
const port = process.env.PORT || 8080

// Basic api url, every call to api will be based on this
const baseURL = 'https://api.github.com/users/';

// Fetches user data from api using provided name
async function getUser(name) {
    try {
    const r = await fetch(baseURL + name);
    const result = await r.json();
    return result;
    }
    catch(err){
        console.log(err);
    }
}

// Fetches repo data from api using provided url
async function getRepos(url) {
    try {
        const r =  fetch(url);
        const result = await (await r).json();
        return result;
    }
    catch(err){
        console.log(err);
    }
}

// Async function that waits fetching of user data, then uses the "repos_url" attribute to get this user's repos data
const asyncFunction = async (name, resp) => {
    const userData = await getUser(name);
    const reposData = await getRepos(userData.repos_url);
    // Sends user data and repos data in array
    const data = [userData, reposData];
    resp.send(data);
}

// Get endpoint for fetching user+repo data, uses req.param for name
app.get('/users/:name', (req, resp) => {
    const name = req.params.name;
    // Call async function
    asyncFunction(name, resp);
})

// Get endpoint for details about specific repo
app.get('/repos/:url', (req, resp) => {
    const url = req.params.url;
    repoAsync(url);
    // async function gets repo data using provided url
    async function repoAsync(url) {
    try {
        const r =  await fetch(url);
        const result = await r.json();
        resp.send(result);
    }
    catch(err){
        console.log(err);
    }}
})


app.listen(port, ()=>console.log('Listening engaged'))