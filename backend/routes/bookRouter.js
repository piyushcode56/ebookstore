const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Book = require('../models/BooksSchema');
const ensureAuthenticated = require('../middlewares/authMiddleware');
const User = require('../models/User');

// const { type } = require('os');
// const { date } = require('joi');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
})
const upload = multer({storage: storage});
router.post('/uploads', upload.single('pdf'),  async (req, res) => {
    try{
        const {bookData} = req.body;
        const pdf = req.file.filename;
        // console.log(pdf);
        const parsedBookData = typeof bookData === 'string' ? JSON.parse(bookData) : bookData;
        // console.log(parsedBookData);
        const book = new Book({
            title:parsedBookData.title,
            image:parsedBookData.image,
            author:parsedBookData.author,
            description:parsedBookData.description,
            price:parsedBookData.price,
            amazonLink:parsedBookData.amazonLink,
            pdf:pdf
        })
        // console.log(book);
        console.log(book);
        await book.save();
        res.status(201).json({success:"data uploaded in the database"})
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})


router.get('/', ensureAuthenticated, async(req, res) => {
    try{
        const books =await Book.find();
        res.status(200).json(books);
    }
    catch(error){
        res.status(500).json({error:"Data cannot be fetched"})
    }
})

router.get('/book/:id', ensureAuthenticated, async(req, res) => {
    try{
        const {id} = req.params;
    // console.log(id);
    const book = await Book.findById(id);
    res.status(200).json(book);
    }
    catch(error){
        res.status(500).json({error: "can't fetched the book"})
    }
    
})


router.put('/add-to-cart', ensureAuthenticated, async(req, res) => {
    try{
        const {bookid, id} = req.headers;
        // console.log(bookid)
        const userData = await User.findById(id);
        const isCarted = userData.cart.includes(bookid);

        isCarted?
        res.status(200).json({message:"This book is already in the cart"})
        :
        await User.findByIdAndUpdate(id, {$push:{cart:bookid}});

        res.status(201).json({success: "Added in cart"})
    }
    catch(error){
        console.log(error);
    }
})


router.delete('/delete-add-to-cart',ensureAuthenticated, async(req, res) => {
    try{
        const {bookid, id} = req.headers;
        console.log(bookid);
        console.log(id)
        const userData = await User.findById(id);
        const isCarted = userData.cart.includes(bookid);
        if(isCarted){
            await User.findByIdAndUpdate(id, {$pull:{cart:bookid}})
        }
        return res.status(200).json({success:"Removed from cart"})
    }
    catch(error){
        res.status(500).json({error: "Internal server error"});
    }
})

router.get('/cart', ensureAuthenticated, async(req, res) => {
    try{
    const {id} = req.headers;
    const userData = await User.findById(id).populate('cart');
    if(!userData.cart){
        res.status(200).json({message:"Empty Cart"})
    }
    else{
        res.status(200).json(userData.cart);
    }
    }
    catch(error){
        res.status(500).json({error:"Empty Cart"})
    }
})



module.exports = router;