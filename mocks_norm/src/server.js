import express from 'express'
import emoji from 'node-emoji'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import productos from './routers/product.router.js'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(morgan('dev'))

app.get('/', (req, res) => { })
app.use('/api/productos', productos)
const PORT = process.env.PORT || 3000 
const server = app.listen(PORT, () => console.log(emoji.get('fire'),`Server started on port http://localhost/PORT`))
server.on('error', (err) => console.log(err))