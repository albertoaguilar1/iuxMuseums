"use strict"


var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
let should = chai.should();
const expect = require('chai').expect;
 var request2 = require('supertest');
 var request = require('supertest')
chai.use(chaiHttp);
var request = request("http://localhost:8081")
var request2 = request2("http://localhost:8080")

 describe('museums', function() {    
      describe('POST', function(){

        let email = "testService@mia.com";
        let password= "mia123";
        let token = "";

        it('Should  login', function(done){
            request2.post('/api/login')
            .send({EmailUser: email,  PasswordUser:password} )    
            .expect('Content-Type', /json/)
                .end( function(err,res){
                    console.log(res.body.token)
                  token=res.body.token   
                  expect(res).to.have.status(200);                
                 done();
                });  
            });

    it('Should  insert json museums', function(done){
        request.post('/api/museums')
        .set('Authorization', token)
        .send( {
             NameMuseum: "test",
        DescriptMuseum: "museo carso",
        TokenMuseum: "sdxfgchvjbk2345678",
        Pieces:
                [
                    { _id: "5dc1d098995bc9a827c32680" }
                ]  
        
        })
        .expect('Content-Type', /json/)
        .end( function(err,res){   
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.message).to.equals("New Musueum created!");
        done();
});

});


    it('Should  not insert json museums why NameEvent is empty', function(done){
        request.post('/api/museums')
        .set('Authorization', token)
        .send( { 
            NameMuseum: "", 
           DescriptMuseum: "museo carso",       
           TokenMuseum: "sdxfgchvjbk2345678",   
           Pieces:[ { _id: "5dc1d098995bc9a827c32680" } ]  
           })
           .expect('Content-Type', /json/)
           .end( function(err,res){   
           expect(res).to.have.status(500);
           done();
    });
});

    it('Should  not insert the museums why reques json museums  is empty', function(done){
        request.post('/api/museums')  
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .end( function(err,res){   
        expect(res).to.have.status(500);
        done();
    });
});

});


describe('GET', function(){
    let id="";
    it('Should return json as default data format', function(done){
        request.get('/api/museums')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .end( function(err,res){   
        expect(res).to.have.status(200);
        done();
    });
});

    it("should get a single name record", (done) => {                      
       request.get('/api/museums/name/test')
       .set('Authorization', token)
        .expect('Content-Type', /json/)
        .end( function(err,res){
            id=res.body.data._id
            console.log("el valor "+ id)
            expect(res).to.have.status(200);
            done();
           });          
        });  


    it("should not get a single museums record", (done) => {
       const id = 1;
       request.get('/api/museums'+`/${id}`)
       .set('Authorization', token)
       .expect('Content-Type', /json/)
        .end( function(err,res){   
        expect(res).to.have.status(404);
        done();
            });
        });  


            it("should get a single museums record", (done) => {
               request.get('/api/museums'+`/${id}`)
               .set('Authorization', token)
               .expect('Content-Type', /json/)
               .end( function(err,res){   
               expect(res).to.have.status(200);
               done();
                    });     
                });                   

});




describe('put', function(){
    let id="";
    it("should get a single name record", (done) => {                      
       request.get('/api/museums/name/test')
       .set('Authorization', token)
        .expect('Content-Type', /json/)
        .end( function(err,res){
            id=res.body.data._id
            console.log("el valor "+ id)
            done();
           });          
        });  
    
    it('Should  insert json museums', function(done){
       request.put('/api/museums'+`/${id}`)
       .set('Authorization', token)
       .send( { 
           NameMuseum: "test", 
          DescriptMuseum: "museo carso",       
          TokenMuseum: "sdxfgchvjbk2345678",   
          Pieces:[ { _id: "5dc1d098995bc9a827c32680" } ]  
          })
      
          .expect('Content-Type', /json/)
          .end( function(err,res){   
          expect(res).to.have.status(200);
          done();

        });          
    }); 

    
    it('Should  insert json museums', function(done){
       request.put('/api/museums/123')
       .set('Authorization', token)
       .send( { 
           NameMuseum: "test", 
          DescriptMuseum: "museo carso",       
          TokenMuseum: "sdxfgchvjbk2345678",   
          Pieces:[ { _id: "5dc1d098995bc9a827c32680" } ]  
          })
          .expect('Content-Type', /json/)
          .end( function(err,res){   
          expect(res).to.have.status(404);
          done();

        });          
    });
    
    });
    
    
    describe('delete', function(){
    let id="";
    it("should get a single name record", (done) => {                      
       request.get('/api/museums/name/test')
       .set('Authorization', token)
        .expect('Content-Type', /json/)
        .end( function(err,res){
            id=res.body.data._id
            console.log("el valor "+ id)
            done();
           });          
        });  
    
    it('Should  remove json museums', function(done){
        console.log(id);
     request.delete('/api/museums'+`/${id}`)
     .set('Authorization', token)
     .expect('Content-Type', /json/)
     .end( function(err,res){   
     expect(res).to.have.status(200);
     done();

   });          
});
    
    it('Should  remove json museums', function(done){
       request.delete('/api/museums'+`/${id}`)
       .set('Authorization', token)
       .expect('Content-Type', /json/)
       .end( function(err,res){   
       expect(res).to.have.status(500);
       done();

     });          
 });
    
}); 


}); //la funcion museums


 
