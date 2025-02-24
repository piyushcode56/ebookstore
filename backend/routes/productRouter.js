const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/authMiddleware');

router.get('/', ensureAuthenticated , (req, res) => {
    // console.log(user);
    console.log(req.user);
    res.status(200).json([
        {
            name:'mobile',
            price:1200
        },{
            name:'bike',
            price:100000
        },
        {
            
        }
    ])
})

module.exports = router;