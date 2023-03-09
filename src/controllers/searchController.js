import { searchRepository } from "../repositories/searchRepository.js";

export async function searchUsername(req, res) {
    const { name } = req.body;
  console.log(name)
    try {
      console.log("1")
      const { rows: users } = await searchRepository.getSearch(name);
      console.log("2")
      console.log(users)
      res.status(200).send(users);
      console.log(res.status(200).send(users))
    } catch (error) {
      res.sendStatus(500);
    }
  }
  
  export async function UsernameById(req, res) {
    const { id } = req.params;
    try {
      const { rows: users } = await searchRepository.getSearchUsernameById(id);
      if (users.length === 0) {
        return res.sendStatus(404)
      };

      res.status(200).send(users[0]);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }