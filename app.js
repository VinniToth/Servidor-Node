const express = require('express')

const app = express()
const port = process.env.PORT || 21350

app.get('/', (req, res) => {
    res.send("DEU CERTO TETA")
})


app.listen(port, function () {
    console.log(`Funcionando na porta ${port}`)
})