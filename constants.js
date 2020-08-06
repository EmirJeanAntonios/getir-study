const joi = require('@hapi/joi')




const ServerRespond = (code=0,msg=[],records=[],status,res)=>{
    let ServerRespondschema = {
        "code":0,
        "msg":[],
        "records":[]
    }
    ServerRespondschema.code = code
    ServerRespondschema.msg = msg
    ServerRespondschema.records = records
    res.status(status)
    res.json(ServerRespondschema)
    
}


/* A Joi Schema to check whether the post data is suitable or not */
const schema = joi.object().keys({
        startDate:joi.date().required(),
        endDate:joi.date().required(),
        minCount:joi.number().integer().required(),
        maxCount:joi.number().integer().required()
})


module.exports = {ServerRespond,schema}