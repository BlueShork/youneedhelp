let mysql = require('mysql2');
let db = require('../config/db');

// Bcrypt

const bcrypt = require('bcrypt');
const { request } = require('express');
const saltRounds = 10;

class Inscription{

    static add(pseudo, email, password, request, response, callback){

        // Vérify if account has been already register in DB
        
        db.query('SELECT * FROM inscription', (err, alreadyResult) => {
            
            if(err){
                request.flash('Une erreur est survenu, veuillez réssayer');
                response.redirect('login');
            }
            
            const email_result = alreadyResult.map((user) => user.email);
            
            if(Object.values(email_result).includes(email)){

                // User has already Exist in DB
                request.error('Une compte à déjà été enregistré avec cette email');
                response.redirect('register');

            }
            else{
                // User has !not! already register
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    db.query('INSERT INTO inscription SET pseudo = ?, email = ?, password = ?', [pseudo, email, hash], (err, result) => {
                        if(err) throw err;
                        callback(result);
                    });
                })
            }
            
            
           
        })
    
        
    }










}

module.exports = Inscription;