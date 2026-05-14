require("dotenv").config();
const app = require('./src/app');



app.listen(process.env.PORT || 3000, () => {
    console.log("The server is listening at port:- ", process.env.PORT || 3000);
});