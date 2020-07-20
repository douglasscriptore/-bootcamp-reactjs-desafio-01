import React, { useState, useEffect } from "react";
import axios from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  /*USE EFFECT*/
  useEffect(() => {
    axios
      .get("repositories")
      .then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    // TODO

    const data = {
      url: "https://github.com/josepholiveira",
      title: `Repositories ${new Date().getTime()}`,
      techs: ["React", "Node.js"],
    };
    const response = await axios.post("repositories", data);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    try {
      await axios.delete(`/repositories/${id}`);
      setRepositories(repositories.filter((repo) => repo.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {!!repositories &&
          repositories.length > 0 &&
          repositories.map((repo) => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
