/* importing neccesary packages */
const express = require('express')
const app  = express()

const MySchema = require('./models/model')
let {ServerRespond,schema} = require('./constants')

app.use(express.json())
/* Middleware checks whether the sended data is json or not */
app.use((err, req, res, next) => {
    try {
        
        parsed = JSON.parse(req.body)
      } catch (e) {
         ServerRespond(1,"please post a valid json",[],400,res)
        
      }
   
  });
app.get("/",(req,res)=>{
    res.send("Getir-Case-Study")
})
app.post('/records',(req,res)=>{
    
    
    //checking whether the posted json data is correct or not by using joi
    const {error,value} = schema.validate(req.body,{ abortEarly: false })
   

    if (error) {
        //if error the respond code will be 1 and with foreach function errors will be pushed in ServerRespond.msg array
        let errors=[]
        error.details.forEach(item=>{
            errors.push(item.message)
        })
        ServerRespond(1,errors,[],400,res)
      
    }
    else{
        MySchema.aggregate([
            {
                //firstly $match will seperate the data according to startDate and endDate
                $match:{
                "createdAt":{$gte:new Date(req.body.startDate),$lte:new Date(req.body.endDate)},
                
                }
            
            },
            //$unwind seperates the count array and creates new objects with the same key but different count values
            {
               $unwind:"$counts"
         },
         //$group will group the same id objects and sums the count values and puts them into new field "totalCount"
         {
           $group:{
               _id:"$key",
               "key":{$first:"$key"},
               "createdAt":{$first:"$createdAt"},
               "totalCount":{$sum:"$counts"}
              
           }
       },
       //$match will check whether the sum of counts is in range of minCount and maxCount
       {
        $match:{
            totalCount:{$gte:parseInt(req.body.minCount),$lte:parseInt(req.body.maxCount)},
            
        }
        
    },
    //$project will show the data
    {
        $project:{
            _id:0,
            "key":1,
            "createdAt":1,
            "totalCount":1
        
        }
    }
    ]).exec((err,result)=>{
        if (err){
            //if the aggregation doesnt work it will set the api status to 500 and the ServerRespond.msg will have the error message
            ServerRespond(1,err,[],500,res)
            
        }else{
            //if it s succeded the code will be 0 msg will be success and ServerRespond.records array will have the result from the aggregation
            
            ServerRespond(0,"Success",result,200,res)
        }
    })
    }
})
module.exports = app;