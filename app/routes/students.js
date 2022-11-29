const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const studentModel = require('../models/student');

const classeModel = require('../models/classe')



// Route Register

router.post('/register',  async(req, res) => {

    const {email, email_cfg, password, password_cfg, firstname, lastname} = req.body;

    if((typeof email === 'undefined' || email.trim() === "") || (typeof password === 'undefined' & password.trim() === "" )){

        return(res.status(500).json({
            msg: "Il faut remplir tous le champs !"
        }))
    }

    if(email !== email_cfg || password !== password_cfg){

        return(res.status(500).json({
            msg: "Les confirmations ne sont pas exactes !"
        }))
    }

    try{

        let existeStudent = await studentModel.findOne({email});

        if(existeStudent){
        
            return res.status(500).json({
                msg: "L'utilisateur existe deja "
            })
        }

        let student = await studentModel.create({

            email: email.trim(),
            password: bcrypt.hashSync(password.trim(), 10),
            firstname: typeof firstname !== 'undefined' ? firstname.trim() : "",
            lastname: typeof lastname !== 'undefined' ? lastname.trim() : "",
        });
    
        return(res.status(200).json(student));
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: "Les confirmations ne sont pas exactes"
        })
    }
});

// Route Login

router.post('/login',  async(req, res) => {

    const {email, password} = req.body;

    if((typeof email === 'undefined' || email.trim() === "") || (typeof password === 'undefined' & password.trim() === "" )){

        return(res.status(500).json({
            msg: "Il faut remplir tous le champs !"
        }))
    }
    
    try{

        let existeStudent = await studentModel.findOne({email: email.trim()});

        if(!existeStudent){
        
            return res.status(500).json({
                msg: "Erreur d'authentification !"
            });
        }

       let  compare = bcrypt.compareSync(password.trim(), existeStudent.password );

       if(!compare){
            return res.status(500).json({
                msg: "Erreur d'authentification !"
            });
       }

       return res.status(200).json(existeStudent);
    }catch(error){

        return res(500).json({
            msg: error
        })
    }

});


// Route pour creer tout les etudiants

router.post('/', async (req, res) => {

   const {firstname, lastname, classe} = req.body; 

   if(typeof firstname === 'undefined' || typeof lastname === 'undefined'){

        return res.status(500).json({
            "msg": "Vous devez entrer votre nom et prenom !"
        })
   }
   
    try{
        
        let student = await studentModel.create({
            firstname,
            lastname,
            classe
        });
        return res.status(200).json(student);
        
    } catch (error){

        return res.status(500).json({

            "msg": "Il y a une erreur" + error
        })
    }
})

// Route pour recuperer tout les etudiants

router.get('/', async (req, res) => {

    try{

        let students = await studentModel.find();

        return res.status(200).json(students);
    }catch(error){

        return res(500).json({
            msg: error
        })
    }
});

// Route pour recuperer un etudiant

router.get('/:id', async (req, res) => {

    const { id } = req.params
    
    try{
        
        let student = await studentModel.findOne({
            _id: id
        });

        return res.status(200).json(student);

    }catch(error){

        return res.status(400).json({
            msg: "Un truc s'est mal passe"
        });
    }
});

// Route pour supprimer un etudiant

router.delete('/:id', async (req, res) => {

    const {id} = req.params;

    try{
        let student = await studentModel.findByIdAndDelete({
            _id: id
        })
        
        return res.status(200).json({

            student,

            "statut": "Cette classe a ete supprimer de la base de donnee"
        });

    }catch(error){

        return res.status(400).json({

            msg: error,

        })

    }
});

// Route pour modifier un etudiant

router.put('/:id', async (req, res) => {

    const {id} = req.params;

    const {firstname, lastname} = req.body;

    try{

        let student = await studentModel.findOneAndUpdate({
            _id: id
        },
        {
            firstname,
            lastname
        },{
            new: true
        })

        return res.status(200).json(student)

    }catch(error){

        return res.status(400).json({
            msg: error
        })
    }

})










module.exports = router;
