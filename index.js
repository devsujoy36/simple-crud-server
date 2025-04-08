const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Simple-crud-server is running")
})

//sujoydaspc2023
// MDckEGKS5bM5bgG0

app.listen(port, () => {
    console.log(`simple crud is running on port: ${port}`)
})