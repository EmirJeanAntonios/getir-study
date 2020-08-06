const mongoose = require('mongoose')
const URI = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true"

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema

var schem = new Schema({
    _id:mongoose.Types.ObjectId,
    counts:Array,
    createdAt:Date,
    key:String,
    value:String
});


module.exports = mongoose.model('Record',schem,'records')