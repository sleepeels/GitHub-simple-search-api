import "./repoDetails.css";

const RepoDetails = ({ details, detailsLoading }) => {
  if (detailsLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="repo-details">
      <div className="detail id">
        {detailsLoading}
        <p>{details.id}</p>
      </div>
      <div className="detail lang">
        <p>{details.language}</p>
      </div>
      <div className="detail forks">
        <p>{details.forks_count}</p>
      </div>
      <div className="detail branch">
        <p>{details.default_branch}</p>
      </div>
      <div className="detail url">
        <p>
          <a
            href={details.html_url}
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
          >
            {details.name}
          </a>
        </p>
      </div>
    </div>
  );
};

export default RepoDetails;
