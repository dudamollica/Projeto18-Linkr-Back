import { searchRepository } from "../repositories/searchRepository.js";
import urlMetadata from "url-metadata";

export async function searchUsername(req, res) {
    const { name } = req.body;

    try {
      const { rows: users } = await searchRepository.getSearch(name);
      res.status(200).send(users);
    } catch (error) {
      res.sendStatus(500);
    }
  }
  
  export async function searchUsernameById(req, res) {
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

  export async function getPostById(req, res) {
    const { id } = req.params;

    try {
        const { rows: posts } = await searchRepository.getSearchPostById(id);
  
        const metadataPosts = await Promise.all(
            posts.map(async ({ id, likes, username, photo, url, post, userId }) => {
                const like = parseInt(likes);
                const metadata = await urlMetadata(url);
                return {
                    id,
                    username,
                    photo,
                    url,
                    post,
                    like,
                    userId,
                    title: metadata.title,
                    image: metadata.image,
                    description: metadata.description,
                };
            })
        );
  
        res.status(200).send(metadataPosts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
  }