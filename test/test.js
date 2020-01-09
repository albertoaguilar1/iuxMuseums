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

}); //end function post


describe('GET', function(){
    let email = "testService@mia.com";
    let password= "mia123";
    let token = "";
    let id = "";

    it('Should  login', function(done){
        request2.post('/api/login')
        .send({EmailUser: email,  PasswordUser:password} )    
        .expect('Content-Type', /json/)
            .end( function(err,res){
              token=res.body.token   
              expect(res).to.have.status(200);                
             done();
            });  
        });

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
            expect(res).to.have.status(200);
            done();
           });          
        });  


    it("should not get a single museums record", (done) => {
     
       request.get('/api/museums/1')
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
    let email = "testService@mia.com";
    let password= "mia123";
    let token = "";
    let id="";

    it('Should  login', function(done){
        request2.post('/api/login')
        .send({EmailUser: email,  PasswordUser:password} )    
        .expect('Content-Type', /json/)
            .end( function(err,res){
         
              token=res.body.token   
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
   let email = "testService@mia.com";
        let password= "mia123";
        let token = "";
        let id  ="";

        it('Should  login', function(done){
            request2.post('/api/login')
            .send({EmailUser: email,  PasswordUser:password} )    
            .expect('Content-Type', /json/)
                .end( function(err,res){
                  
                  token=res.body.token   
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
            expect(res).to.have.status(200);
            done();
           });          
        });  
    
    it('Should  remove json museums', function(done){
       
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


    //la funcion pieces
describe('pieces', function() {   
    
    
    describe('POST', function(){

        let email = "testService@mia.com";
        let password= "mia123";
        let token = "";

        it('Should  login', function(done){
            request2.post('/api/login')
            .send({EmailUser: email,  PasswordUser:password} )    
            .expect('Content-Type', /json/)
                .end( function(err,res){
                  
                  token=res.body.token   
                  expect(res).to.have.status(200);                
                 done();
                });  
            });

    it('Should  insert json pieces', function(done){
     request.post('/api/pieces')
     .set('Authorization', token)
     .send({
       NamePieces:"test",
        DescripPieces:"museo edificacion",
         ImgPieces:"c://",
          TokenPiece :"eawsdfghj234567890"
     }
     )
     .expect('Content-Type', /json/)
     .end( function(err,res){   
     expect(res).to.have.status(200);
     done();
    });
});
    it('Should  not insert json pieces why NamePieces is empty', function(done){
        request.post('/api/pieces')
        .set('Authorization', token)
        .send( {
          NamePieces: "",
           DescripPieces:"",
            ImgPieces:"c://",
             TokenPiece :"eawsdfghj234567890"
        })
        .expect('Content-Type', /json/)
        .end( function(err,res){   
        expect(res).to.have.status(500);
        done();
       });
    });
       
       it('Should  not insert the pieces why reques json pieces  is empty', function(done){
        request.post('/api/pieces')  
        .set('Authorization', token)
            .expect('Content-Type', /json/)
            .end( function(err,res){   
            expect(res).to.have.status(500);
            done();
       });
   
    });
}); //end post pieces
    
    describe('GET', function(){
        let email = "testService@mia.com";
        let password= "mia123";
        let token = "";
        let id  ="";

        it('Should  login', function(done){
            request2.post('/api/login')
            .send({EmailUser: email,  PasswordUser:password} )    
            .expect('Content-Type', /json/)
                .end( function(err,res){
                  token=res.body.token   
                  expect(res).to.have.status(200);                
                 done();
                });  
            });

      it('Should return json as default data format', function(done){
          request.get('/api/pieces')
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end( function(err,res){   
          expect(res).to.have.status(200);
          done();
      });
    });
    
      it("should get a single name record", (done) => {                      
       request.get('/api/pieces/name/test')
       .set('Authorization', token)
        .expect('Content-Type', /json/)
        .end( function(err,res){
            id=res.body.data._id
            expect(res).to.have.status(200);
            done();
           });          
        });  
    
              it("should get a single pieces record", (done) => {
                 request.get('/api/pieces'+`/${id}`) 
                 .set('Authorization', token)
                 .expect('Content-Type', /json/)
                 .end( function(err,res){
                    expect(res).to.have.status(200);
                    done();
                      });   
                    }); 
                      
                      it("should not get a single pieces record", (done) => {
                        request.get('/api/pieces/123')
                        .set('Authorization', token)
                        .expect('Content-Type', /json/)
                        .end( function(err,res){   
                        expect(res).to.have.status(404);
                        done();
    });
});
});//end get pieces 


  describe('put', function(){
    
    let email = "testService@mia.com";
    let password= "mia123";
    let token = "";
    let id  ="";

    it('Should  login', function(done){
        request2.post('/api/login')
        .send({EmailUser: email,  PasswordUser:password} )    
        .expect('Content-Type', /json/)
            .end( function(err,res){
              token=res.body.token   
              expect(res).to.have.status(200);                
             done();
            });  
        });
    
    it("should get a single name record", (done) => {                      
       request.get('/api/pieces/name/test')
       .set('Authorization', token)
        .expect('Content-Type', /json/)
        .end( function(err,res){
            id=res.body.data._id
            expect(res).to.have.status(200);
            done();
           });          
        });  
    
    it('Should  update json pieces', function(done){
     request.put('/api/pieces/123')
     .set('Authorization', token)
     .send({
       NamePieces: "test",
        DescripPieces:"museo edificacion",
         ImgPieces:"c://",
          TokenPiece :"eawsdfghj234567890"
     })
     .expect('Content-Type', /json/)
     .end( function(err,res){   
     expect(res).to.have.status(404);
     done();
    });
});
    
    it('Should  update json pieces  id ', function(done){
     request.put('/api/pieces'+`/${id}`)
     .set('Authorization', token)
     .send({
       NamePieces: "test",
        DescripPieces:"museo edificacion",
         ImgPieces:"c://",
          TokenPiece :"eawsdfghj234567890"
     })
     .expect('Content-Type', /json/)
     .end( function(err,res){   
     expect(res).to.have.status(200);
     done();
    });
    
    });


});//end put pieces
    
    
    describe('delete', function(){
        let email = "testService@mia.com";
        let password= "mia123";
        let token = "";
        let id  ="";

        it('Should  login', function(done){
            request2.post('/api/login')
            .send({EmailUser: email,  PasswordUser:password} )    
            .expect('Content-Type', /json/)
                .end( function(err,res){
                  token=res.body.token   
                  expect(res).to.have.status(200);                
                 done();
                });  
            });
    it("should get a single name record", (done) => {                      
       request.get('/api/pieces/name/test')
       .set('Authorization', token)
        .expect('Content-Type', /json/)
        .end( function(err,res){
            id=res.body.data._id
            expect(res).to.have.status(200);
            done();
           });          
        });  
    
    it('Should  remove json pieces', function(done){
    request.delete('/api/pieces'+`/${id}`)
    .set('Authorization', token)
    .expect('Content-Type', /json/)
    .end( function(err,res){   
    expect(res).to.have.status(200);
    done();
    });
});
    
    it('Should  remove json museums', function(done){
     request.delete('/api/pieces'+`/${id}`)
     .set('Authorization', token)
     .expect('Content-Type', /json/)
     .end( function(err,res){   
     expect(res).to.have.status(500);
     done();
    });
    });
    //la funcion pieces
    });
});



