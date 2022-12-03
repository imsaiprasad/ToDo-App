const express=require('express');
const app=express();
const path=require('path');


const todoStore=require(path.join(__dirname,'./Db/todoStore.js'));  // this is my model


// ..................... Database Connection....................

const mongoose=require('mongoose');
const ok='mongodb+srv://saiprasad:saiprasad@cluster0.huuoxxb.mongodb.net/ToDoApp?retryWrites=true&w=majority';
mongoose.connect(ok).then(()=>{
    console.log("connection Done")
}).catch((error)=>{
    console.log("connection failed")
});

// ..................... Database Connection....................

app.use(express.json());
app.use(express.urlencoded({extended:false}));


// Add logic of ToDo's
app.post('/add',(req,res)=>{

    const heading=req.body.heading;
    const para=req.body.para;
    const store=new todoStore({heading,para})
    store.save().then((data)=>{
        res.send(data);
        console.log("added")
    }).catch((e)=>{
        res.send(e);
    })

})


// retrieving all ToDo's
app.get('/retrieve',(req,res)=>{

    todoStore.find({}).then((data)=>{
        res.send(data)
        console.log("request came")
    }).catch((e)=>{
        res.send(e)
    })
})

// Updating ToDO's
app.post('/update',(req,res)=>{
    const heading=req.body.heading;
    const para=req.body.para;

    todoStore.updateOne({heading},{$set:{heading,para}}).then((data)=>{
        res.send(data)
    }).catch((e)=>{
        res.send(e)
    })

})

// Deleting ToDO
app.post('/delete',(req,res)=>{
    const heading=req.body.heading;
    todoStore.deleteOne({heading}).then((data)=>{
        res.send(data)
        console.log("deleted")
    }).catch((e)=>{
        res.send(e)
    })
})



app.listen(8000,()=>{
    console.log("listening...")
})