const mongoose = require('mongoose')
//connecting to mongoDB
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
    console.log('mongoDB connected sucessfully');
})

const Product = mongoose.model('Product',{
        id: Number,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        rating: {
            rate: Number,
            count: Number
        }
    })

    const Wishlist = mongoose.model('Wishlist',{
        id: Number,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        rating: {
            rate: Number,
            count: Number
        }
    })

module.exports={
    Product,
    Wishlist
}
