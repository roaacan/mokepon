/* 
    Endpoint: cada URL que el backend expone para que el front-end utilice
    CORS: Es una medida de seguridad del backend para que no cualquier fron-end realice
    consultas, lo normal es que una sitio web alojado en el mismo serve haga consultas.
    " Access-Control-Allow-Origin"
    JSON (javaScript Object Notation): Objeto que nos permite enviar datos de front a back.
*/

// Importar la libreria express
const express = require("express")
const cors = require("cors") // Importar cors

// Crear el servidor - backend
const app = express()
//http://roaacan.local:8080
app.use(express.static("public")) // hacer que el frontend corra desde el backend
app.use(cors()) // Evita errores de cors
app.use(express.json()) // Permitir usar json


// Clase de los jugadores
class Player {
    constructor(id) {
        this.id = id // Asignando el id
    }

    
    setMokepon(mokepon) {
        this.mokepon = mokepon
    }

    updtatePosition(x, y) {
        this.x = x
        this.y = y
    }

    setAttacks(attacks) {
        this.attacks = attacks
    }
}

// Class Mokepon
class Mokepon {
    constructor(name) {
        this.name = name
    }
}


// 
const players = []


// Generar id cada ves que el jugador se conecta
// Endpoint: Punto de entrada para que el cliente pueda acceder a los recursos del sitio web
app.get("/join", (req, res) => {
    const id = `${Math.random()}` // Crear id
    const player = new Player(id) // Crear objeto player con id
    players.push(player) // Agregar player a la lista de players
    
    // Establecer una cabecera
    // res.setHeader("Access-Control-Allow-Origin", "*")

    
    res.send(id) // Inviar el id al jugador
})


// Cada servicio solo se debe dedicar a una cosa
// :parametro
app.post("/mokepon/:playerId", (req, res) => {
    const playerId = req.params.playerId || ""// Acceder al valor del parm
    const nameMokepon = req.body.mokepon || ""
    const mokepon = new Mokepon(nameMokepon)
    
    const playerIndex = players.findIndex((player) => playerId === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].setMokepon(mokepon)
    }

    console.log(players)
    console.log(playerId)
    res.end() // Terminar res
})

// Recibir coordenadas
app.post("/mokepon/:playerId/position", (req, res) => {
    const playerId = req.params.playerId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const playerIndex = players.findIndex((player) => playerId === player.id)
    if (playerIndex >= 0) {
        players[playerIndex].updtatePosition(x, y)
    }

    // Resonder con la posición de los jugadores.
    const enemies = players.filter((player) => playerId !== player.id)
    res.send({
        enemies
    })
})

// Recibir ataques
app.post("/mokepon/:playerId/attacks", (req, res) => {
    const playerId = req.params.playerId || ""
    const attacks = req.body.attacks || []
    const playerIndex = players.findIndex((player) => playerId === player.id)
    if (playerIndex >= 0) {
        players[playerIndex].setAttacks(attacks)
    }

    res.end()
})

// Enviar attaque del enemigo
app.get("/mokepon/:playerId/attacks", (req, res) => {
    const playerId = req.params.playerId || ""
    const player = players.find((player) =>  player.id === playerId)
    res.send({
        attacks: player.attacks || []
    })
}) 


// Escuchar cualquier solicitud al puero esp
app.listen(8080,() => {
    console.log("it's working")
})