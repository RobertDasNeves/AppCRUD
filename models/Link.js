const mongoose = require('mongoose');
const validator = require('validator');

const linkSchema = new mongoose.Schema({
    cadIden: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{11}$|^\d{14}$/,
    },
    cadName: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v) => v.length > 0,
            message: "O campo 'cadName' não pode ser vazio!",
        },
    },
    cadNascimento: {
        type: Date,
        required: true,
    },
    cadEnd: {
        type: String,
        required: true,
        trim: true,
    },
    cadEmail: {
        type: String,
        validate: {
            validator: (v) => v === "" || validator.isEmail(v),
            message: (props) => `${props.value} não é um email válido!`,
        },
        default: "",
    },
    cadTel: {
        type: String,
        required: true,
        match: /^\d{10,11}$/,
    },
    cadAf1: {
        type: String,
        required: true,
        trim: true,
    },
    cadAf2: {
        type: String,
        trim: true,
    },
    cadObs: {
        type: String,
        trim: true,
        maxlength: 500,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('Link', linkSchema);
