require('dotenv').config();
require('colors');
const express=require("express");
const app=express();
const path=require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session=require("express-session");
const helmet = require('helmet');
const SHA256 = require("crypto-js/sha256");
const MongoStore = require('connect-mongo');
const hbs=require("express-handlebars");
const cors = require('cors');

/* ================ UTILS file  STARTS  =================*/

const port=process.env.PORT
const BASIC_UTILS = require("./utils/basicUtils.js");
const DB=require("./utils/dbUtils");
const index=require("./routes/index")
const users=require("./routes/users/main");
const products=require("./routes/product/main");
/* ================  UTILS file ENDS  =================*/



/* ================ Configuring Database STARTS  =================*/
DB.dbUtils.dbInit();    
/* ================ Configuring Database END  =================*/




/* ================ Session Management STARTS  =================*/

const sessionSettings = {
    secret: SHA256(BASIC_UTILS.randomString(20)).toString(),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store:MongoStore.create({
        mongoUrl: process.env.DB_CONNECTION_STRING
    })
}
app.use(session(sessionSettings));

/* ================ Session Management ENDS  =================*/



/* ================ Configuring body and Cookie Parser STARTS  =================*/
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(helmet());

/* app.engine('hbs', 
    hbs.engine({ 
        extname: 'hbs',
        defaultLayout:'layout',
        layoutsDir: __dirname + '/views/layouts/' , 
        partialsDir  : [
            path.join(__dirname, 'views/components'),
        ]
    })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
 */
/* ================ Configuring body and Cookie Parser END  =================*/



/* ========================= ROUTES START ==============================*/


app.use("/",index)              // INDEX ROUTES
app.use("/users",users);        // USERS ROUTES
app.use("/products",products)   // PRODUCTS ROUTES

/* ========================= ROUTES END ==============================*/




/* ================catch 404 and forward to error handler STARTS  =================*/

/* app.use(function(req, res, next) {
    next(createError(404));
    res.sendStatus(404);
});
 */


/* ================ Connecting with the PORT STARTS  =================*/

    const onListening=() =>{
        bootstrapMessage();
    }

    const bootstrapMessage=()=>{
        console.info(`\n\t SERVER IS ONLINE [ 🔋 ] AND RUNNING [ ✔️  ]  \n
        \n\t -ON PORT :: ${port}
        \n\t -STARTED AT :: ${new Date()}
        \n\t---------------------- Product Management LOGS ----------------------\n `.rainbow);
    }

    app.listen(port).on('listening',onListening);

/* ================ Connecting with the PORT STARTS  =================*/