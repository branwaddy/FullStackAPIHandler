import { Link } from "react-router-dom";

const Repo = (props) => {
  // Get repo details
    const repo = props.repo;
    const repoName = repo.name;
    const lastCommitDate = repo.updated_at.slice(0,10);
    const creationDate = repo.created_at.slice(0,10);
    const repoUrl = repo.url;
    let repoCommits = props.commits;

    // If there is no description provided for repo
    let repoDescription;
    if (repo.description == null) {
        repoDescription = "N/A"
    }
    else {
        repoDescription = repo.description;
    }

    // Build list of commits with appropriate details
    let commitList;
    if (repoCommits != null) {
      repoCommits = repoCommits.slice(0,5);
      commitList = repoCommits.map((commit, i) =>
      <div key={i}>
          <h2>Commit #{i+1}</h2>
          <p>Description: {commit.commit.message}</p>
      </div>
      );
    }

  return (
    // Render
    <div>
      <Link to='/'><button>HOME</button></Link>
        <h1>{repoName}</h1>
        <p>{repoDescription}</p>
        <a href={repoUrl}>LINK</a>
        <br/>
        <h2>COMMITS:</h2>
        {commitList}
        <br/>
        <p><i>Created: {creationDate}</i></p>
        <p><i>Last updated: {lastCommitDate}</i></p>

    </div>
  )
}

export default Repo