module.exports = function(request, response, next){

    if(request.session.error){
        response.locals.error = request.session.error;
        request.session.error = undefined;
    }


    request.error = function(content){

        if(request.session.error === undefined){
            request.session.error = {};
        }


        request.session.error = content;
    }
    next();
}