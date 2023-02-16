const express = require('express')
const cors = require('cors');
const { json } = require('express');
const dataService = require('./dataServices')
//starting server 
const server = express()
server.listen(3000, () => {
    console.log('server started at port 3000');
})

//corse orgin configuring
server.use(cors({
    origin: "http://localhost:4200"
}))

//parsing json data
server.use(express.json())

//to get all products
server.get('/Allproducts',(req,res)=>{
   dataService.allProducts().then((result)=>{
      res.status(result.statusCode).json(result)
   })
})

// to view a sepecific product
server.get('/viewProduct/:id',(req,res)=>{
    dataService.viewProduct(parseInt(req.params.id)).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

server.post('/add-to-wishlist',(req,res)=>{
    dataService.addToWishList(req.body).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

server.get('/get-wishlist',(req,res)=>{
    dataService.getWishlist().then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

server.delete('/deletewishlistitem/:id',(req,res)=>{
    dataService.deleteWishlistItem(req.params.id).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
