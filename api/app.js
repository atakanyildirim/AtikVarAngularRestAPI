const express = require('express');
const app = express();
const bodyParser = require("body-parser");
var cors = require('cors')
const morgan = require('morgan'); // Her HTTP isteğinde bağlantıyla ilgili info verir

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(morgan('short'));

//Rotaları Çağırma
const userRouter = require('./routes/user.js');
const loginRouter = require('./routes/login.js');
const wasteRouter = require('./routes/waste.js');

//Rotaları kullanma
app.use(userRouter);
app.use(loginRouter);
app.use(wasteRouter);

//Hoşgeldiniz
app.get("/", (req,res) => {
    res.json({info: "Atık Var RestFul Api", versiyon : "1.0"});
});

//Server Başlat
app.listen(3003, () => {
    console.log("Server çalıştırıldı ve 3003 portunu kullanıyor");
})