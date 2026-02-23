const url=require("http");

const port=5000;
// Creating server
const server=url.createServer((req,res)=>{

    console.log(req.url);

    // res.setHeader('Content-Type', 'text/plain');
    // res.statusCode(200); 
    // res.write("welcome to server 5000")

    // res.writeHead(200, { 'Content-Type': 'text/plain' }); // Set status and header
    // // res.end('Hello World');

    if(req.url=="/"){

        const data = {
            name: "Nirrop",
            city: "Hyderabad"
        }

        // res.statusCode(200);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    }
if(req.url=="/about"){

     

    const data = {
            title: "About Us",
            subTitle: "Hyderabad"
        }

        // res.statusCode(200);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    }

});

// Run The server
server.listen(port,(req,res)=>{
console.log(`Your server is running at http://localhost:${port}`);
});