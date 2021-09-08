const express = require("express")
const morgan = require("morgan");
const { getFolderFiles } = require("./files");
const { sucess } = require("./logger");
const { router } = require("./router");
const fileupload = require("express-fileupload")
const settings = require("./settings.json")
const app = express();

const ip = require("ip").address()
app.use(morgan("dev"));

getFolderFiles()
app.use(express.json());
app.use(fileupload())
app.use(express.urlencoded({extended:false}))
let PORT = process.env.PORT || settings.port

app.use("/css",express.static(__dirname + '/public/css'));
app.use("/video",express.static(__dirname + '/public/videos'));
app.use("/javascript",express.static(__dirname + '/public/javascript'));
app.use("/resources",express.static(__dirname + '/public/resources'));
app.use("/images",express.static(__dirname + '/public/images'));
app.use("/manifest.json",express.static(__dirname + '/public/manifest.json'));

app.use("/",router)
app.set("view engine","ejs")
app.set("views",__dirname + "/views")
app.listen(PORT,()=>{
    console.log(`
    _       _  _  _  _     _   __   __     ___   
   (_)  _  (_)(_)(_)(_)   (_) (__)_(__)  _(___)_ 
   (_) (_) (_) _  _ (_)   (_)(_) (_) (_)(_)   (_)
   (_) (_) (_)(_)(_)(_)   (_)(_) (_) (_)(_)    _ 
   (_)_(_)_(_)(_)(_)(_)___(_)(_)     (_)(_)___(_)
    (__) (__) (_)(_) (_____) (_)     (_)  (___)  
    
    WiiUMC Beta 1 - © CarlosThePro
    `);   

    sucess(`Servidor inciado`)
    sucess("\n-- Para acceder en tu WiiU entra al navegador y ingresa la IP --\n                  --" + ip + ":" + PORT + "--");
    
})
