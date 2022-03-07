const express = require('express')

const app = express();

app.use(logger)

app.listen(4000, ()=>{
   console.log('listening to port 4000')
})

app.get('/books',(req,res)=>{
     return res.send({ route: "/books"})
})

let permission= false;
app.get('/author',checkPermission("author"),(req,res)=>{
    return res.send({ route: "/author",permission:permission})
})

app.get('/libraries',checkPermission("librarian"),(req,res)=>{
    return res.send({ route: "/libraries",permission:permission})
})

function logger (req,res,next){
    console.log('i am middleware')
    next();
}

function checkPermission(role){

    return function checkPermission(req,res,next){
        if(role == 'author' && req.path=='/author'){
            permission=true;
        }
        else if(role == 'librarian' && req.path=='/libraries'){
            permission=true;
        }
       next();
       
    }
}
