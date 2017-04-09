const PhepTinh=require('../PhepTinh.js');

module.exports=(req,res)=>{
    const {pt,a,b}=req.body;
    const gt=new PhepTinh(pt,a,b);
    try{
        res.send(gt.getResultString());
    }
    catch(e){
        res.send(e+'');
    }
}