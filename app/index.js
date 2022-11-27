
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

app.use(morgan("dev"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, {
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

app.use('students/:id', studentRouter);


app.use('/classes', route_class);

app.use('/classes/:id', route_class);


// app.post('/classes', route_class);

app.listen(4500, ()=>{

    console.log("server is running on http://127.0.0.1:4500");
})

