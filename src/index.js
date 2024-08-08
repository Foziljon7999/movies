const express = require('express')
const mongo = require('./config/mongo')
const router = require('./routes')


const app = express()
mongo()
.then(() => console.log("Connected"))
.catch((err) => console.log(err))

app.use(express.json())
app.use(router)

app.listen(9000, console.log(9000))