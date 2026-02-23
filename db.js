const mysql=require("mysql2");
const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Niroop@9705",
    database:"nodetraining",
    port:3306
});

module.exports=pool.promise();