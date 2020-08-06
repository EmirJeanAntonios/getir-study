process.env.NODE_ENV = 'test';


const chai = require('chai');
const chaiHttp = require('chai-http');

const app  = require("../app")
const should = chai.should();
const joi = require("@hapi/joi")

chai.use(chaiHttp);

function sendDataToServer(sampledata={
   "startDate": "2016-01-26",
   "endDate": "2018-02-02",
   "minCount": 2700,
   "maxCount": 3000
   }){
  return chai.request(app)
   .post("/records")
   .send(sampledata)

}



describe("POST /records ",()=>{

   /* Testing whether the endpoint is working or not */
   it("API Should Return the status code 200",(done)=>{
     
         sendDataToServer().end((err,res)=>{
            
            res.should.have.status(200)
            done()
           
         })
   })

   it("The Response Should be an object and it has to have the right properties",(done)=>{
      sendDataToServer().end((err,res)=>{
        
         res.body.should.be.a("object")
         res.body.should.have.property("code")
         res.body.should.have.property("msg")
         res.body.should.have.property("records")
         res.body.records.should.be.a("array")
         done()
      })
   })

   it("the API has to give a code 1 when the sended data is incorrect",(done)=>{
      const wrongData = {
         "startDate": "201asdasd-01-26",
         "endDate": "2018-02-02",
         "minCount": 2700
         
         }
         sendDataToServer(wrongData).end((err,res)=>{
            res.body.code.should.equals(1)
      done()
   })
     
   })
   it("the API has to give a status 400 when the sended data is not json",(done)=>{
      
         sendDataToServer("wrongData").end((err,res)=>{
            res.should.have.status(400)

      done()
   })
     
   })
   



})