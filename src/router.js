const fs = require('fs');
const path= require('path');
const querystring = require('querystring');
const handler = require('./handler')
const router = (request, response) => {
    const url = request.url;
    const method = request.method;
    if(url === '/') {
        handler('/public/index.html',response)
      }  else if ( url === "/public/main.css"){
    //     const filePath = path.join(__dirname,'..','public','main.css');
    //     fs.readFile(filePath, (error, data) => {
    //       if (error) {
    //         console.log(error);
    //         response.end("mosasas")
    //         return;
    //       } else {
    //         response.writeHead(200, { 'Content-Type': 'text/css' })
    //         response.end(data);
    //       }
    //     })
    handler(url,response)
      } 
      else if ( url === "/public/img/logo1.png"){
        handler(url,response)
      }
      else if ( url === "/public/script.js"){
        handler(url,response)
      }
      // to save data and send to json file
      else if ( url === "/create-post" && method === "POST"){
          //event to recive data
     let allTheData = '';
      request.on('data', chunkOfData => {
      allTheData += chunkOfData;
      });
      //when all data recive
    request.on('end', () => {
    const filePath = path.join(__dirname,'posts.json');
    //to recive datd and send to json file 
        const convertedData = querystring.parse(allTheData)
        fs.readFile(filePath,(err,data)=>{
          if(err){
            response.writeHead(500)
            response.end('error server')
          }else {
            obj=JSON.parse(data)
            // to save data in json file
            obj[Date.now()]= convertedData.post;
            fs.writeFile(filePath,JSON.stringify(obj),error=>{
            console.log(error);
            })
          }
        })
        response.writeHead(302,{"location":"/"})
        response.end()
      });

    }
    // json file url 
    else if ( url === "/posts"){
        const filePath = path.join(__dirname,'posts.json');
        fs.readFile(filePath, (error, data) => {
          if (error) {
            console.log(error);
            response.end("mosasas")
            return;
          } else {
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(data);
          }
        })
      }   else if ( url === "/public/img/logo2.png"){
       handler(url,response)
      }

      else {
        response.writeHead(404)
        response.end("not found")
    } 
    
  }
  module.exports = router