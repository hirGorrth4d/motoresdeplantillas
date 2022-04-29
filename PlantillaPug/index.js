const express = require('express')
const app = express ()
let products =  [
    {
        "product": "Iphone 12",
        "price": 800
    },
    {
        "product": "Macbook Pro 14",
        "price": 1600
    },
    {
        "product": "Apple Watch",
        "price": 600
    },
    {
        "product": "Macbook Air",
        "price": 1000
    },
    {
        "product": "Ipad",
        "price": 900
    }
]
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(express.static("public"))
app.set("views", "./views")
app.set("view engine", "pug")

app.get("/", (req,res) =>{
    res.render("index.pug", {titulo: "Carga tu producto"})
})
app.get("/productos", (req,res) =>{
    res.render("productos", {data: products})
})
app.post("/productos", (req,res) =>{
    let {product, price} = req.body
    let newProduct = {
        product: product,
        price: price
    }
    products.push(newProduct)
    res.render("productos", 
        {data: products
        })
})

app.listen(8080, ()=>{
    console.log("server is running on port 8080")
})