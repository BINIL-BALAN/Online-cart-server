const db = require('./db')

//function to fetch all products form database
const allProducts = () => {
    return db.Product.find()
        .then((result) => {
            if (result) {
                return {
                    statusCode: 200,
                    Products: result
                }
            } else {

                return {
                    statusCode: 400,
                    message: "Can't fetch data"
                }
            }
        })

}

const viewProduct = (id) => {
    return db.Product.findOne({ id }).then((result) => {
        if (result) {
            return {
                statusCode: 200,
                product: result
            }
        } else {
            return {
                statusCode: 404,
                message: 'Product not found'
            }
        }
    })
}

const addToWishList = (product) => {
    return db.Wishlist.findOne({ id: product.id }).then((result) => {
        if (result) {
            return {
                statusCode: 401,
                message: "Product already in wish list"
            }
        } else {
            let newProduct = new db.Wishlist({
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                rating: {
                    rate: product.rating.rate,
                    count: product.rating.count
                }
            })
            newProduct.save()
            return {
                statusCode: 200,
                message: "product added to wish list"
            }
        }
    })
}

const getWishlist = () => {
    return db.Wishlist.find().then((result) => {
        if (result) {
            return {
                statusCode: 200,
                products: result
            }
        } else {
            return {
                statusCode: 404,
                message: "Wishlist is empty"
            }
        }
    })
}

const deleteWishlistItem = (id) => {
    return db.Wishlist.deleteOne({ id }).then((result) => {
        if (result) {
            return db.Wishlist.find().then((result) => {
                if (result) {
                    return {
                        statusCode: 200,
                        products: result
                    }
                } else {
                    return {
                        statusCode: 404,
                        message: "Wishlist empty"
                    }
                }
            })
        } else {
            return {
                statusCode: 400,
                message: "Item do not found"
            }
        }
    })
}
module.exports = {
    allProducts,
    viewProduct,
    addToWishList,
    getWishlist,
    deleteWishlistItem
}