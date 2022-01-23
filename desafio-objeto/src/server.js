import express from 'express'
import emoji from 'node-emoji'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import minimist from 'minimist'
import {fork} from 'child_process'

const options = {
	default: {
		PORT: 8080,
		}
    }

const dir = process.cwd();
const idPro = process.pid;
const ver = process.versions;
const title = process.title;
const os = process.platform;
const memory = process.memoryUsage();
const info = [
    dir,
    idPro,
    ver,
    title,
    os,
    memory,
]

const arg = minimist(process.argv.slice(2), options)
import UserRouter from './routers/user.router.js'
import './db.js'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(morgan('dev'))

const computo = fork('./src/random.js')

app.get('/', (req, res) => { 
    console.log("Server Up")
    res.status(200).send("<h1>Server Up</h1>")
})

app.get('/info', (req, res) => {
    res.status(200).json(info)
})

app.get('/random', (req, res) => {
    
    computo.on('message', (resultado) =>{
        console.log('res', resultado)
        res.status(200).json({resultado})
    })
   computo.send('start')
    

})

app.use('/user', UserRouter)


const server = app.listen(arg.PORT, () => console.log(emoji.get('fire'),`Server started on port http://localhost/${arg.PORT}`))
server.on('error', (err) => console.log(err))