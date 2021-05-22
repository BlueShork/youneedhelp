let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let fetch = require('node-fetch');
const axios = require('axios').default;
const https = require("http");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const helmet = require('helmet');

const isConnect = require('./middleswares/isConnect');




let app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(session({
    secret: "Younnedhelp_session",
    resave: true,
    saveUninitialized: true,
    cookie: {}
}))

app.use(helmet.frameguard({ action : "SAMEORIGIN"}));
app.use('/assets/', express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(require('./middleswares/isConnect'));
app.use(require('./middleswares/flash_error'));





app.get('/', (request, response) => {
    response.render('index');
});

app.post('/register', (request, response) => {
    let Inscription = require('./models/Inscription');
    Inscription.add(request.body.pseudo, request.body.email, request.body.password, request, response, function(callback){
        
        request.error("Votre compte à bien été créer");
        response.redirect('login');
        
        // response.send(callback);
    })
});



// Login

app.post('/login', (request, response) => {
    let Login = require('./models/Login');
        Login.connect(request.body.email, request.body.password, request, response, function(result){
            response.redirect(301, "dashboard");
        })
});

app.post('/child', (request, response) => {
    let Instagram = require('./models/Instagram');

    Instagram.send(request.body.pseudo, request.body.message, function(result){
        // require('child_process').fork('./models/Instagram');
        console.log(result);
        response.redirect(301, 'child');
    })



})

app.get('/get', (request, response) => {
    response.json(["Tony","Lisa","Michael","Ginger","Food"]);
    // function file_get_content(filename){
    //     fetch(filename)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         // console.log(data);
    //         const result = data;
    //         console.log(result);
           
    //     });

    // }
    // file_get_content("http://localhost/piege/index.php?q=ethan.mrsst");


    
})

app.get('/dashboard', (request, response) => {
    response.locals.user = request.session.user;
    if(request.session.user){
        console.log("SERVER"+ request.session.user);
        response.render('Dashboard');    
    }
    else{
        response.render('Login');
    }
    

});

app.get('/register', (request, response) => {
    response.render('register');
});

app.get('/login', (request, response) => {
    response.render('login');
});

app.get('/child', (request, response) => {
    response.render('child');
    // require('child_process').fork('child/code.js');
})


app.get('/disconnect', (request, response) => {
    request.session.destroy((err) => {
        response.redirect('/');
    })
})




app.listen(3000);