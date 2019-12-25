"use strict"

var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
let should = chai.should();
const expect = require('chai').expect;
 var request = require('supertest')
chai.use(chaiHttp);

var request = request("http://localhost:8082")







 describe('museums', function() {    
      describe('POST', function(){
    it('Should  insert json museums', function(done){
        request.post('/api/museums')
        .send( { 
        NameMuseum: "soumaya2", 
        DescriptMuseum: "museo carso",       
        TokenMuseum: "sdxfgchvjbk2345678",   
        Pieces:[ { _id: "5dc1d098995bc9a827c32680" } ]  
        })
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Should  not insert json museums why NameEvent is empty', function(done){
        request.post('/api/museums')
        .send( { 
            NameMuseum: "", 
           DescriptMuseum: "museo carso",       
           TokenMuseum: "sdxfgchvjbk2345678",   
           Pieces:[ { _id: "5dc1d098995bc9a827c32680" } ]  
           })
            .expect('Content-Type', /json/)
            .expect(500, done);
    });

    it('Should  not insert the museums why reques json museums  is empty', function(done){
        request.post('/api/museums')  
            .expect('Content-Type', /json/)
            .expect(500, done);
    });
});



     describe('GET', function(){
         it('Should return json as default data format', function(done){
             request.get('/api/museums')
                 .expect('Content-Type', /json/)
                 .expect(200, done);
         });


         it("should not get a single museums record", (done) => {
            const id = 1;
            request.get('/api/museums'+`/${id}`)

            .expect('Content-Type', /json/)
            .expect(404, done);
                 });


                 it("should get a single museums record", (done) => {
                    request.get('/api/museums'+`/${id}`)
                    .expect('Content-Type', /json/)
                    .expect(200, done);
                         });                      
     
     });





 describe('put', function(){
    it('Should  insert json museums', function(done){
        const id = '5dfd3837cb20b292a0f59d76';
        request.put('/api/museums'+`/${id}`)
        .send( { 
            NameMuseum: "soumaya2", 
           DescriptMuseum: "museo carso",       
           TokenMuseum: "sdxfgchvjbk2345678",   
           Pieces:[ { _id: "5dc1d098995bc9a827c32680" } ]  
           })
       
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Should  insert json museums', function(done){
        const id = '5dfd3837cb20b292a0f59d76XXX';
        request.put('/api/museums'+`/${id}`)

        .send( { 
            NameMuseum: "soumaya2", 
           DescriptMuseum: "museo carso",       
           TokenMuseum: "sdxfgchvjbk2345678",   
           Pieces:[ { _id: "5dc1d098995bc9a827c32680" } ]  
           })
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

});


describe('delete', function(){
    it('Should  remove json museums', function(done){
      const id = '5dfd3837cb20b292a0f59d76';
      request.delete('/api/museums'+`/${id}`)
      .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Should  remove json museums', function(done){
        const id = '5dfd3837cb20b292a0f59d76';
        request.delete('/api/museums'+`/${id}`)
        .expect('Content-Type', /json/)
              .expect(404, done);
      });
});

//la funcion museums
});





//la funcion pieces
describe('pieces', function() {    
    describe('POST', function(){
  it('Should  insert json pieces', function(done){
      request.post('/api/pieces')
      .send({
        NamePieces: "test",
         DescripPieces:"museo edificacion",
          ImgPieces:"c://",
           TokenPiece :"eawsdfghj234567890"
      }
      )
          .expect('Content-Type', /json/)
          .expect(200, done);
  });

  it('Should  not insert json pieces why NamePieces is empty', function(done){
      request.post('/api/pieces')
      .send( {
        NamePieces: "",
         DescripPieces:"museo edificacion",
          ImgPieces:"c://",
           TokenPiece :"eawsdfghj234567890"
      })
          .expect('Content-Type', /json/)
          .expect(500, done);
  });

  it('Should  not insert the pieces why reques json pieces  is empty', function(done){
      request.post('/api/pieces')  
          .expect('Content-Type', /json/)
          .expect(500, done);
  });
});

   describe('GET', function(){
       it('Should return json as default data format', function(done){
           request.get('/api/pieces')
               .expect('Content-Type', /json/)
               .expect(200, done);
       });


       it("should not get a single pieces record", (done) => {
          request.get('/api/pieces/123')
          .expect('Content-Type', /json/)
          .expect(404, done);
               });


               it("should get a single pieces record", (done) => {
                  request.get('/api/pieces'+`/${id}`) 
                  .expect('Content-Type', /json/)
                  .expect(200, done);
                       });                      
   
   });





describe('put', function(){
  it('Should  insert json pieces', function(done){
      request.put('/api/pieces'+`/${id}`)
      .send({
        NamePieces: "Soumaya",
         DescripPieces:"museo edificacion",
          ImgPieces:"c://",
           TokenPiece :"eawsdfghj234567890"
      }
      )
     
          .expect('Content-Type', /json/)
          .expect(200, done);
  });

  it('Should  insert json pieces', function(done){
      request.put('/api/pieces'+`/${id}`)
      .send({
        NamePieces: "Soumaya",
         DescripPieces:"museo edificacion",
          ImgPieces:"c://",
           TokenPiece :"eawsdfghj234567890"
      }
      )
          .expect('Content-Type', /json/)
          .expect(404, done);
  });

});


describe('delete', function(){
  it('Should  remove json pieces', function(done){
    request.delete('/api/pieces'+`/${id}`)
    .expect('Content-Type', /json/)
          .expect(200, done);
  });

  it('Should  remove json museums', function(done){
      request.delete('/api/pieces'+`/${id}`)
      .expect('Content-Type', /json/)
            .expect(404, done);
    });
});

//la funcion pieces
});