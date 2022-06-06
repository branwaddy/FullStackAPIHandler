import {Link} from 'react-router-dom'

const Search = (props) => {
  // On submit of search form trigger event 'searchUser'
  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    props.searchUser(name);
  }

  // Variable to determine if user exists or not once search is complete
  const userFound = props.userFound;

  /* Result will be an element that either is a button that is a link to the user route, or an error message saying the user is
  not found, depending on boolean 'userFound'*/
  let result;
  if (userFound === true) {
    result = (<Link to='user'><button className='result-btn'>User found!</button></Link>)
  }
  if (userFound === false) {
    result = (<h3 className='error'>User not found!</h3>)
  }

  return (
    // Render
    <div>
      <h1>Welcome to the GITHUB API search app!</h1>
      <p>Simply enter the username of the GITHUB account you would like to search for, click submit and you will be directed
        to a page with all the details.
      </p>
      <br/>
      <form onSubmit={onSubmit}>
         <label for='months'>Username:</label><br/>
          <input type='text' placeholder='eg. octocat'/>
          <input class='btn'type='submit'/>
        </form>
      {result}
      
    </div>
  )
}

export default Search