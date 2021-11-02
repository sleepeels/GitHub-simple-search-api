import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import RepoDetails from "./RepoDetails";

function App() {
  const [repos, setRepos] = useState([]);
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    setDetails({});
    setRepos([]);
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRepos();
  };

  const searchRepos = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/repos`,
    }).then((res) => {
      setLoading(false);
      setRepos(res.data);
    });
  };

  const renderRepos = (repo) => {
    return (
      <div className="repo" key={repo.id} onClick={() => getDetails(repo.name)}>
        {repo.name}
      </div>
    );
  };

  const getDetails = (repo) => {
    setDetailsLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/repos/${username}/${repo}`,
    }).then((res) => {
      setDetailsLoading(false);
      setDetails(res.data);
    });
  };

  return (
    <div className="page">
      <div className="header">
        <div className="heading">
          <i className="icon fa fa-cloud"></i>
          <h1>GitHub Simple Search</h1>
        </div>
        <div className="search-box">
          <form spellCheck="false" className="repos-search-form" action="">
            <input
              type="text"
              placeholder="username..."
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit}>
              {loading ? `Searching...` : `search`}
            </button>
          </form>
        </div>
      </div>
      <div className="repo-wrapper">
        <div className="repos-panel">{repos.map(renderRepos)}</div>
        <div className="repo-details">
          {detailsLoading}
          <RepoDetails details={details} detailsLoading={detailsLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
