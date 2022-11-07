
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

app.use(morgan("dev"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://root:root@mongo:27017/b3?authSource=admin', {
    useNewUrlParser: true
}, (error) => {
    if(error){
        console.log(error);
    }else{
        console.log('BD connect !');
    }
})

var route_class = require('./routes/class');

const studentRouter = require('./routes/students')

app.use('/students', studentRouter);

app.get('/classes', route_class);

app.post('/classes', route_class);

app.get('/:id', route_class);

app.delete('/:id', route_class);

app.put('/:id', route_class);

app.listen(4500, ()=>{

    console.log("server is running on http://127.0.1:4500");
})

