const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validaterepository(request, response, next){
  const { id } = request.params;
}

app.get("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.query

  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO

  const { title, url, techs } = request.body;
  
  const repository = { id: uuid(), title, url, techs, likes:0 };
  repositories.push(repository);
  
  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryindex = repositories.findIndex(repository => repository.id == id);
  
  if (repositoryindex < 0){
    return response.status(400).json({ error: 'Repository not foud.'})
  }

  const repository = {id, title, url, techs};
  repositories[repositoryindex] = repository;

  return response.status(400).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Reposytory not found'})
  }

  repositories.slice(repositoryIndex, 1)
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const { likes } = request.body;
  

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Reposytory not found'})
  }
  
  const currentLikes = repositories[repositoryIndex].likes + 1;

  const repository = {
    id,
    title: repositories[repositoryIndex].title,
    url: repositories[repositoryIndex].url,
    techs: repositories[repositoryIndex].techs,
    likes: currentLikes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

module.exports = app;
