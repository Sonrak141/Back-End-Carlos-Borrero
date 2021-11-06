const express =require( 'express')
const emoji =require('node-emoji') 
const cors =require('cors') 
const morgan =require('morgan') 
const dotenv =require('dotenv') 
const MongoStore =require('connect-mongo') 
const session =require('express-session') 
const path =require('path') 


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const options = {userNewUrlParser:true, useUnifiedTopology:true}
app.use(session({
    store:MongoStore.create({
        mongoUrl:process.env.MONGOURI,
        options
    }),
    resave: true,
    saveUninitialized:true,
    secret: process.env.SECRET,
}))

app.get('/contador', (req, res)=>{
    if (req.session.contador) {
        req.session.contador++
        res.send(`Has visitado la pagina ${req.session.contador}`)
      } else {
        req.session.contador = 1
        res.send('Bienvenidos!')
      }
})
app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/public/index.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname+ '/public/login.html')
})

app.post('/login',(req, res) => {
   
   if(req.body.user !== 'user' || req.body.password !== 'password') {
       return res.send('Login Failed')
   }else{
       req.session.user = req.body.user
       req.session.admin = true
       res.sendFile(__dirname+ '/public/login.html')
       
   }
})

app.post('/logout', function(req, res) {
    req.session.destroy((err) => {
        if(!err) {
            res.send('Log Out')
        }else{
            res.send(err)
        }
    })
})


app.get('/', (req, res) => { })

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(emoji.get('fire'),`Server started on port http://localhost/${PORT}`))
server.on('error', (err) => console.log(err))