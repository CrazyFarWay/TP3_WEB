require('dotenv').config()
const app = require('./src/app')

const PORT = process.env.HTTP_PORT || 3306

app.listen(PORT,()=>{
    console.log(`Server corriendo en http://localhost:${PORT}/`)
})