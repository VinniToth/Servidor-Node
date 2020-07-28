const express = require('express')

const app = express()
const port = process.env.PORT || 21350

app.get('/', (req, res) => {
    res.send("DEU CERTO!")
})

app.listen(port, function () {
    console.log(`App ta funcionando na porta ${port}`)
})
