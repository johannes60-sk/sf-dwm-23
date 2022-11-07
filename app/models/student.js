const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            require: [true, 'Entrer un prenom'], // renvoie un message disant qu'il faut entre un prenom
            trim: true
        },
        
        lastname: {
            type: String,
            require: [true, 'Entrer un nom'], // renvoie un message disant qu'il faut entre un nom
            trim: true
        }
    },

    // {
    //     lastname: {
    //         type: String,
    //         require: [true, 'Entrer un nom'], // renvoie un message disant qu'il faut entre un nom
    //         trim: true
    //     }
    // },
    
    {
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Student', studentSchema);