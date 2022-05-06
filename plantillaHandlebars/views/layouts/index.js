const socket = io()
socket.on("mensaje_back", (data) => {
    console.log(data)
    render(data)
    socket.emit("message_client", "Conexion aceptada")
})

const render = (data) =>{
    let html = data.map(x=>{
        return `<p>${x.email} [${x.date}]: ${x.message}</p>`
    }).join(" ")
    document.querySelector("#chat").innerHTML = html
}

const addInfo = () =>{
    let dataObj = {
        email: document.querySelector("#email").value,
        date: document.querySelector("#date").value,
        message: document.querySelector("#message").value
    }
    socket.emit("dataMessage", dataObj)
    document.querySelector("#message").value = ""
    return false
}
