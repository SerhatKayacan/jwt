const router = require("express").Router();
const verify=require('./verifyToken');

router.get('/',verify,(req,res)=>{ // verify isimli middleware function eklendi
    res.send(req.user);
    //User.findbyOne({_id:req.user});
});

module.exports=router;