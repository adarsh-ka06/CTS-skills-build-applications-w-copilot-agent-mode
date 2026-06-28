import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/teams`);
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        setError('Unable to load teams.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-3">Teams</h1>
      <p className="text-muted">Fetching from: <code>{`${apiBaseUrl}/teams`}</code></p>

      {loading && <div>Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Members</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id}>
                  <td>{team.name}</td>
                  <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                  <td>{new Date(team.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Teams;
