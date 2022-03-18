const router = require('express').Router();
const apiRoutes=require('./notesRoutes')
const htmlRoutes=require('./htmlRoutes')



router.use('/api/notes', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;