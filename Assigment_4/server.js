const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config({ path: "./config.env" });


const port = process.env.PORT||3000

mongoose.connect(process.env.DB_LOCAL_URL).then((con)=>{
  console.log("Connection done successfully");
  // console.log(con.connection);  
}).catch((err)=>{
  console.log("Connection failed",err);
})

app.listen(port, () => {
    console.log(`Express app is running on http://localhost:${port}`);
    })
