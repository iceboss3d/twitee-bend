import { response } from "../helpers/response.js";
import {Twit, User, Comment} from "../models/index.js";
import { CommentValidate, TwitValidate } from "../validator/index.js";

export const sendTwit = async (req, res) => {
  try {
    const validate = await TwitValidate.validateAsync(req.body);

    const twit = await Twit.create({
      twit: validate.twit,
      UserId: req.user.id,
    });

    return response.successWithData(res, "Twit sent", twit, 201);
  } catch (error) {
    if (error.isJoi) {
      return response.validationError(res, error.details);
    }
    return response.error(res, error.message);
  }
};

export const getTwits = async (req, res) => {
  try {
    const twits = await Twit.findAll({include: [User, Comment]});
    return response.successWithData(res, "Twits returned", twits);
  } catch (error) {
    return response.error(res, error.message);
  }
};

export const getTwit = async (req, res) => {
  try {
    const twit = await Twit.findOne({ where: { id: req.params.id }, include: [User, Comment]});
    if (!twit) {
      return response.error(res, "Twit not found", 404);
    }
    return response.successWithData(res, "Twit returned", twit);
  } catch (error) {
    return response.error(res, error.message);
  }
};

export const deleteTwit = async (req, res) => {
  try {
    const twit = await Twit.findOne({ where: { id: req.params.id } });
    if (!twit) {
      return response.error(res, "Twit not found", 404);
    }
    if (twit.UserId != req.user.id) {
      return response.error(res, "Unauthorized", 403);
    }
    await Twit.destroy({ where: { id: request.params.id } })
    return response.success(res, "Twit deleted");
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
