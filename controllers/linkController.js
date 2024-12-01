const Link = require('../models/Link');
const mongoose = require('mongoose');

const redirect = async (req, res, next) => {
    const { cadName } = req.params;

    try {
        const doc = await Link.findOne({ cadName });
        if (doc) {
            res.redirect(doc.someField || '/');
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao processar o redirecionamento.");
    }
};

const addLink = async (req, res) => {
    const link = new Link(req.body);

    try {
        const doc = await link.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        const validationErrors = Object.values(error.errors || {}).map(err => err.message);
        res.render('add', { error: validationErrors.join(', '), body: req.body });
    }
};

const allLinks = async (req, res) => {
    try {
        const docs = await Link.find({});
        res.status(200).render('all', { links: docs });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar os links.");
    }
};

const deleteLink = async (req, res) => {
    let { id } = req.params;
    if (!id) {
        id = req.body.id;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("ID inválido.");
    }

    try {
        const deleted = await Link.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).send("Link não encontrado.");
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao excluir o link.");
    }
};

const loadLink = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("ID inválido.");
    }

    try {
        const doc = await Link.findById(id);
        if (!doc) {
            return res.status(404).send("Link não encontrado.");
        }
        res.render('edit', { error: false, body: doc });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar o link.");
    }
};

const editLink = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("ID inválido.");
    }

    try {
        const update = {
            cadIden: req.body.cadIden,
            cadName: req.body.cadName,
            cadNascimento: req.body.cadNascimento,
            cadEnd: req.body.cadEnd,
            cadEmail: req.body.cadEmail,
            cadTel: req.body.cadTel,
            cadAf1: req.body.cadAf1,
            cadAf2: req.body.cadAf2,
            cadObs: req.body.cadObs,
        };

        const updated = await Link.findByIdAndUpdate(id, update, { new: true, runValidators: true });

        if (!updated) {
            return res.status(404).send("Link não encontrado.");
        }

        res.redirect('/');
    } catch (error) {
        console.error(error);
        const validationErrors = Object.values(error.errors || {}).map(err => err.message);
        res.render('edit', { error: validationErrors.join(', '), body: req.body });
    }
};

module.exports = { redirect, addLink, allLinks, deleteLink, loadLink, editLink };
