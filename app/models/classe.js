// import mongoose, {Schema} from 'mongoose'

const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        trim: true
    },

    NbreEleve: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Classe', classeSchema)