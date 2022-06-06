import {Link} from 'react-router-dom';

const User = (props) => {
    // Establish all needed user details
    const name = props.userData.name;
    const login = props.userData.login;
    const id = props.userData.id;
    const repos =props.reposData;
    const bio = props.userData.nbio

    // Build list of user's repos
    let recentRepos = [];
    // Only show 4 most recent;
    if (repos.length > 4) {recentRepos = repos.slice(0,4)} else {recentRepos = repos};
    // Display repos as button inks to '/repo' route, on button click trigger event 'onClick'
    const repoList = recentRepos.map((repo) =>
    <li key={repo.id}>
        <Link to='/repo'><button id={repo.id} onClick={(e)=>props.onClick(e.target)}>{repo.name}</button></Link>
    </li>
    );
    
  return (
    // Render
    <div>
      <Link to='/'><button>HOME</button></Link>
        <h1>{name}</h1>
        <img src={props.userData.avatar_url} alt='userImg' />
        <p>{bio}</p>
        <p>Login: {login}</p>
        <p>ID: {id}</p>
        <h2>REPOS:</h2>
        <ul>{repoList}</ul>;

    </div>
  )
}

export default User