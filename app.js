const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("DEU CERTO!")
})

app.listen(port, function () {
    console.log(`App ta funcionando na porta ${port}`)
})
