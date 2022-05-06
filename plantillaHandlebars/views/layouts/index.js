const socket = io()
socket.on("mensaje_back", (data) => {
    console.log(data)
    render(data)
})

const render = (data) =>{
    let html = data.map(x=>{
        return `<p>${x.nombre}: ${x.hora}: ${x.mensaje}`
    }).join(" ")
    document.querySelector("#chat").innerHTML = html
}

