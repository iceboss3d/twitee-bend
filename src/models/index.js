import User from './user.model.js';
import Twit from './twit.model.js';
import Comment from './comment.model.js';

User.hasMany(Twit);
Twit.hasMany(Comment);
Twit.belongsTo(User);
Comment.belongsTo(Twit);

export { User, Twit, Comment };