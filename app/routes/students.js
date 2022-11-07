const express = require('express');

const studentModel = require('../models/student');

const router = express.Router();

router.post('/', async (req, res) => {

   const {firstname, lastname} = req.body; 

   if(typeof firstname === 'undefined' || typeof lastname === 'undefined'){

        return res.status(500).json({
            "msg": "Vous devez entrer votre nom et prenom !"
        })
   }
   
    try{
        
        let student = await studentModel.create({
            firstname,
            lastname
        });

        return res.status(200).json(student);
        
    } catch (error){

        return res.status(200).json({

            "msg": "Il y a une erreur" + error
        })
    }
})








module.exports = router;
