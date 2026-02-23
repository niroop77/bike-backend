const db = require("./db");
const web = require("http");

const port = 5001;

const server = web.createServer(async (req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  // GET ALL BIKES
  if (req.method === "GET" && req.url.startsWith("/getbikes")) {
    try {
      const [bikes] = await db.query("SELECT * FROM bikes ORDER BY ID DESC");
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(bikes));
    } catch (err) {
      console.log(err);
      res.writeHead(500);
      return res.end("Error fetching bikes");
    }
  }

  // ADD BIKE
  if (req.method === "POST" && req.url.startsWith("/addbike")) {

    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);

        const sql = `
          INSERT INTO bikes
          (name, price, type, mileage, mfgYear, engineType, category, chasisNumber)
          VALUES (?, ?, ?, ?,?, ?, ?, ?)
        `;

        await db.query(sql, [
          data.name,
          data.price,
          data.type,
          data.mileage,  
          data.mfgYear,
          data.engineType,
          data.category,
          data.chasisNumber
        ]);

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Bike added successfully" }));

      } catch (err) {
        console.log(err);
        res.writeHead(500);
        return res.end(JSON.stringify({ message: "Bike added Failed" }));
      }
    });
  }
// UPDATE BIKE
if (req.method === "PUT" && req.url.startsWith("/updatebike/")) {

  console.log("reached");

  const id = req.url.split("/")[2];
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const data = JSON.parse(body);
// console.log(data);
      const sql = `
        UPDATE bikes
        SET name=?, price=?, type=?, mileage=?, mfgYear=?, engineType=?, category=?, chasisNumber=?
        WHERE id=?
      `;

      await db.query(sql, [
        data.name,
        data.price,
        data.type,
        data.mileage,
        data.mfgYear,
        data.engineType,
        data.category,
        data.chasisNumber,
        id
      ], (err, result) =>{
        if(err)
          console.log(err)

      });

      res.writeHead(200);
      return res.end(JSON.stringify({ message: "Bike updated successfully" }));
    } catch (err) {
      console.log(err);
      res.writeHead(500);
      return res.end(JSON.stringify({ message: "Update Failed" }));;
    }
  });
}
  // DELETE BIKE
  if (req.method === "DELETE" && req.url.startsWith("/deletebike/")) {
    const id = req.url.split("/")[2];

    try {
      await db.query("DELETE FROM bikes WHERE id = ?", [id]);
      res.writeHead(200);
      return res.end(JSON.stringify({ message: "Deleted" }));
    } catch (err) {
      console.log(err);
      res.writeHead(500);
      return res.end(JSON.stringify({ message: "Delete Failed" }));
    }
  }

});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});