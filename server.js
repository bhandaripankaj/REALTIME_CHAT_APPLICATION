const express = require('express')
const app = express()

const port = process.env.PORT || 4000

app.use(express.static('public'))

// const dbConnect = require('./db')
// dbConnect()
const comment  = require('./models').comment
const models = require('./models')
app.use(express.json())

// Routes 
app.post('/api/comments', async (req, res) => {
     await comment.create({
        username:req.body.username,
        comment:req.body.comment
    }).then(response => {
        console.log("===data",response)
        res.send(response)
    })
})

app.get('/api/comments', async (req, res) => {
             await comment.findAll().then(comments=>{
                     res.send(comments)
                 })
})


const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
// console.log("=======isso",server.listening)


let io = require('socket.io')(server, { cors: { origin: "http://localhost:4000" } })
// console.log("=======io",io)
io.on('connection', (socket) => { 
    // console.log("=======data",socket)

    // console.log(`New connection: ${socket.id}`)
    // Recieve event
    socket.on('comment', (data) => {
        console.log("=======data",data)
        data.time = Date()
        socket.broadcast.emit('comment', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data) 
    })
    // socket.broadcast.emit('push', { data });

    
})