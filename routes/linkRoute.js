const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride('_method'));
router.use(express.urlencoded({ extended: true }));

const linkController = require('../controllers/linkController');

router.get('/', linkController.allLinks);
router.get('/add', (req, res) => res.render('add', { error: false, body: {} }));
router.get('/calendar', (req, res) => {
    res.render('calendar', { error: false, body: {} });
});
router.get('/edit/:id', linkController.loadLink);
router.get('/:title', linkController.redirect);

router.post('/', linkController.addLink);
router.post('/edit/:id', linkController.editLink);

router.delete('/:id', linkController.deleteLink);
router.delete('/', linkController.deleteLink);

module.exports = router;
