const express = require ("express")
const app = express()
const router = require("./routes/index")

const http = require ("http")
const server = http.createServer(app)

const port = process.env.PORT || 8080

app.use(express.static(__dirname+"/public"))

const mensajes= []
const productos= []

//routes
app.use("/api", router)


//socket

const {Server} = require("socket.io")
const io = new Server(server)

io.on("connection", (socket) =>{
    //productos
    socket.emit("producto", productos)
    socket.on("producto_respuesta", (data) =>{
        console.log(data)
    })
    socket.on("dataProdCliente", (data) =>{
        productos.push(data)
        console.log(productos)
        io.sockets.emit("producto", productos)
    })

    //mensajes
    console.log("usuario conectado")
    socket.emit("mensaje_chat", mensajes)
    socket.on("mensaje_respuesta", (data) =>{
        console.log(data)
    })

    socket.on("dataMensajesCliente",(data)=>{
        console.log(data)
        mensajes.push(data)
        console.log(mensajes)
        // socket.emit("mensaje_chat", mensajes)
        io.sockets.emit("mensaje_chat", mensajes)
    })
})




server.listen(port, () =>{
    console.log("server running on")
})