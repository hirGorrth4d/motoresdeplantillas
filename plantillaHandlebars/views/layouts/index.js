const socket = io()
socket.on("mensaje_back", (data) => {
    console.log(data)
    render(data)
    socket.emit("message_client", "Conexion aceptada")
    
})

socket.on("agregar_producto", (data) =>{
    console.log(data)
    renderProd(data)
    socket.emit("producto_cliente", "Disponible para agregar producto" )
})

const render = (data) =>{
    let html = data.map(x=>{
        return `<p>${x.email} [${x.date}]: ${x.message}</p>`
    }).join(" ")
    document.querySelector("#chat").innerHTML = html
}

const renderProd = (data) => {
    let html = data.map(x =>{
        return `<tr>
                    <td>${this.product}</td>
                    <td>${this.price}</td>
                </tr>`
    })
    document.querySelector("#prod").innerHTML = html
}

const addProduct = () => {
    let dataProd = {
        product: document.querySelector("#prod").value,
        price: document.querySelector("#price").value
    }
    socket.emit("dataProducto", dataProd)
    document.querySelector("#prod").value = " "
    document.querySelector("#price").value = " "
    return false
}

const addInfo = () =>{
    let dataObj = {
        email: document.querySelector("#email").value,
        date: document.querySelector("#date").value,
        message: document.querySelector("#message").value
    }
    socket.emit("dataMessage", dataObj)
    document.querySelector("#message").value = " "
    return false
}
