const express = require('express')
const {engine} = require('express-handlebars')
const app = express ()
let products =  [
    // {
    //     "product": "Iphone 12",
    //     "price": 800
    // },
    // {
    //     "product": "Macbook Pro 14",
    //     "price": 1600
    // },
    // {
    //     "product": "Apple Watch",
    //     "price": 600
    // },
    // {
    //     "product": "Macbook Air",
    //     "price": 1000
    // },
    // {
    //     "product": "Ipad",
    //     "price": 900
    // }
]
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(express.static("public"))
app.set("views", "./views")
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

const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server

io.on("connection", (socket) => {
    console.log("ser conecta usuario")
    socket.emit("mensaje_back", products)
    socket.on("dataproductos", (data)=>{
        products.push(data)
        io.sockets.emit("mensaje_back", products)
    })
})

app.get("/", (req,res) =>{
    res.render("main", {titulo: "Carga tu producto"})
})

app.get("/", (req,res) =>{
    res.render("main", {data: products})
})

app.post("/", (req,res) =>{
    let {product, price} = req.body
    let newProduct = {
        product: product,
        price: price
    }
    products.push(newProduct)
    res.render("main", 
        {data: products
        })
})


server.listen(8080, ()=>{
    console.log("server is running on port 8080")
})