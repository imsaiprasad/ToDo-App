const mongoose=require('mongoose');
const mySchema=new mongoose.Schema({

    heading:{
        type:String
    },
    para:{
        type:String
    }

});

const todomodel=new mongoose.model('ToDo',mySchema);
module.exports= todomodel;
