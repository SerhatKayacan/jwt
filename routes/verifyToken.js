const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){
    const token=req.header('auth-token');
    //token yoksa
    if(!token) return res.status(401).send('access denied');

    try{
        const verified=jwt.verify(token, process.env.TOKEN_SECRET);
        req.user=verified; // requeste user eklendi(_id)
        next();//bu middlewareden çık sonraki fonksiyona geç
    }catch(err){
        res.status(400).send('invalid token');
    }
}