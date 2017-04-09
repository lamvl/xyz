module.exports=(request,response)=>{
    const id2=request.params.id2;
    const name=request.params.name;
    response.send('Hello World: ' + id2+" : "+name);
}