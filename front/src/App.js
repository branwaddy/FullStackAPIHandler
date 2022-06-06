import {useState} from "react"
import User from './components/User';
import Loading from "./components/Loading";
import Repo from "./components/Repo";
import Search from "./components/Search";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  // State for current user data
  const [userData, setUserData] = useState({});
  // State for current repo data
  const [reposData, setReposData] = useState({});
  // State for if search has loaded- default is 'not requested', and will then be a boolean during request
  const [isLoaded, setLoaded] = useState('not requested');
  // State for currently selected repo, contains data on repo
  const [currRepo, setRepo] = useState();
  // State for user has been found (exists) or not, works the same as 'isLoaded'
  const [userFound, setFound] = useState('not requested');
  // State for commit data of the current repo
  const [currRepoCommits, setCommits] = useState();

  // Function to search for user using username as paramater
  const searchUser = (name) =>{
    // Search has technically begun so set isLoaded as false
    setLoaded(false);
    // Get request to '/users/:name' endpoint, data sent back should be an array with the structure [userData, repoData]
    fetch('/users/' + name)
    .then(res=> 
        res.json()
    )
    .then(result => {
        // Set states
        setUserData(result[0]);
        setReposData(result[1]);
        setLoaded(true);
        /* Check if user exists, if the user does not exist, there should be a message at result[0].message saying the user
        couldn't be found. If this message == null, the user has been found and we can set userFound to true.*/
        if (result[0].message != null) {
          setFound(false);
        }
        else {
          setFound(true);
        }
    })
    .catch(err=>{
        console.log(err);
        setFound(false);
    })
};

// Function that prepares to display data about a specific repo
const openRepo = (e) => {
  /* Find data of specific repo by iterating through reposData until the clicked repo (e)'s id == to the iterated repo's id,
  and find the index of this repo.*/
  const index = reposData.findIndex(x => x.id == e.id);
  // Set currRepo to the repo at found index 
  setRepo(reposData[index]);
  // Get url for data about repo's commits- found at 'reposData[index].commits_url.slice(0,-6)';
  const commitUrl = reposData[index].commits_url.slice(0,-6);
  // Fetch commit data, passing encoded url as paramater
  fetch('http://localhost:8080/repos/' + encodeURIComponent(commitUrl))
    .then(res=> 
        res.json()
    )
    .then(result => {
        // Set states
        setCommits(result);
    })
    .catch(err=>{
        console.log(err);
    })
  }

  return (
    // Render (note at '/', element is either <Search/> or <Loading/>)
    <BrowserRouter>
    <Routes>
      <Route path='/' element={isLoaded ? <Search userFound={userFound} searchUser={searchUser}/>:
      <Loading />}/>
      <Route path='/user' element= {
      <User userData = {userData} reposData = {reposData} isLoaded = {isLoaded}  onClick = {openRepo}/>}/>
      <Route path='/repo' element={<Repo repo={currRepo} commits={currRepoCommits}/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
