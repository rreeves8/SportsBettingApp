const express = require("express");
var jsonParser = bodyParser.json()
const app = express();

app.use(jsonParser)

app.post("LogIn", (request, response) => {
    
})


app.listen(8080, () => {
    console.log(`Listening on port ${port}, press any key to stop`)  
});