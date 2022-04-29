const express = require('express')
const {engine} = require('express-handlebars')
const app = express ()
const {products} = require('./products.json')


app.use(express.static("public"))
app.set("view", "./views")
app.set("view engine", "hbs")
app.engine(
    "hbs", 
    engine({
        extname: "hbs",
        layoutsDir: __dirname+"/views/layouts",
        defaultLayout: "index",
        partialsDir: __dirname+"views/partials",
    })
)
app.get("/", (req,res) =>{
    res.render("main", {titulo: "Carga tu producto"})
})
console.log(products)
app.get("/productos", (req,res) =>{
    res.render("productos", {data: products})
})

// app.post("/productos", (req,res) =>{
//     res.render
// })


app.listen(8080, ()=>{
    console.log("server is running on port 8080")
})