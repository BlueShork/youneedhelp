module.exports = function(request, response, next){


   
   

   request.auth = function(content){

    if(request.session.user === undefined){
        request.session.user = {};
    }
   
    request.session.user = content;
    request.session.save();

   }

   next();




}