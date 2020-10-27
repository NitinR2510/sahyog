const express=require('express')
const session=require('express-session')
const {hospitalRoutes}=require('./routers/hospitalRoutes')
const {vendorRoutes}=require('./routers/vendorRoutes')
const {homeRoutes}=require('./routers/homeRoutes')
const { db }=require('./database/models')
const app=express()
var cookieParser = require('cookie-parser')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine','hbs')

const NODE_ENV = 'development'
const SESS_NAME = "Sahyog"
const INT_PROD = NODE_ENV === 'production'

app.use(session({
    secret: 'secret',
    name: 'SahyogApp',
    resave: true,
    saveUninitialized: true,
    cookie :{
        expires: 60000
    }
    })

)
  

app.use('/', express.static(__dirname + '/public'))
app.use('/',homeRoutes)

const PORT=5000
db.sync()
.then(()=>{
    app.listen(PORT,()=>{console.log(`server started at http://localhost:${PORT}`)})
})
.catch((err)=>{
    console.error(new Error('server could not start'))
    console.error(err)
})