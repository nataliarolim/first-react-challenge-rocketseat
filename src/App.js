import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const loadRepositories = async() => {
    const response = await api.get('/repositories');
    setRepositories(response.data);
  }

  useEffect(() => {
    loadRepositories();

  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Challenge React",
      url: "https://github.com/nataliarolim/first-node-challenge",
      techs: ["ReactJs", "NodeJs", "React Native"]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newRepo = repositories.filter((repo)=> id !== repo.id);
    setRepositories([...newRepo]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo, index) => (
          <li key={index}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
          )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
