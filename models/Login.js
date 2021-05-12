let db = require('../config/db');
let mysql = require('mysql2');
let bcrypt = require('bcrypt');
const { response } = require('express');


class Login{

    constructor(result){
        this.result = result
    }

    get email(){
        return this.result.email;
    }


    static connect(email, password, request, response, callback){

        db.query('SELECT * FROM inscription WHERE email = ?', [email], (err, result) => {
            if(err){
                request.error("Une erreur est survenu");
                callback({error: "Une erreur est survenue"});
            }
            if(result === undefined || ""){
                request.error("Une erreur est survenu");
                callback({error: "Une erreur est survenue"});
            }
            else{
                bcrypt.compare(password, result[0].password, (err, isExist) => {
                    
                    if(isExist == true){
                        // User has been authentificate
                        request.auth(result[0]);
                        callback(new Login(result[0]));
                    }
                    else{
                        // User has not been authentificate
                        request.error("Une erreur est survenu");
                        callback(err);
                        
                    }
                })
                
            }
        })
    }


}




module.exports = Login;