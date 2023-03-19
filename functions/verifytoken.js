const jwt = require('jsonwebtoken');

module.exports = (token,tokenSecret)=>{
    if(!token || !token.startsWith('bearer ')) return false;
    const myToken = token.substring(7);
    try{
    const results = jwt.verify(myToken,tokenSecret);
    return results;
    }catch(err){
        return false;
    }
}