import { response } from "../helpers/response.js";
import { Twit, Comment } from "../models/index.js";
import { CommentValidate } from "../validator/index.js";

export const comment = async (req, res) => {
  try {
    const twit = await Twit.findOne({ where: { id: req.params.id } });
    if (!twit) {
      return response.error(res, "Twit not found", 404);
    }
    const validate = await CommentValidate.validateAsync(req.body);
    const comment = await Comment.create({
      comment: validate.comment,
      TwitId: req.params.id
    })
    
    return response.successWithData(res, "Comment added", comment);
  } catch (error) {
    if (error.isJoi) {
      return response.validationError(res, error.details);
    }
    return response.error(res, error.message);
  }
};
