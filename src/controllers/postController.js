import { addLike, sumLikesAmount, postDelete, postCreator} from "../repositories/postRepository.js";

export async function likePost(req, res) {
  const { id } = req.params;
  const userId = res.locals.user;
  try {
    await addLike(id, userId);
    res.status(200).send("ok");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function amountOfLikes(req, res) {
  const post_id = req.params.id;
  try {
    const amountLikes = await sumLikesAmount(post_id);
    res.status(200).send(amountLikes.rows[0]);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function deletePost(req, res) {
  const post_id = req.params.id;
  const userId = res.locals.user;
  try {
    const userCreator = await postCreator(post_id)
    if(userCreator.rows[0] == userId){
    await postDelete(post_id);
    res.status(200).send("ok");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function editPost(req, res) {}
