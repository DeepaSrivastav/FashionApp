const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require("mongoose");


const cookieParser = require('cookie-parser');
 app.use(cookieParser())
const port = 3000
// const path=require('path')

require('dotenv').config()

// app.use(express.static(path.join(__dirname, '/client/dist')));

//middleware
app.use(express.json());
app.use(cors({
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  origin:'*',
  credentials: true
}))

const productRoutes = require('./src/products/product.route')
const cartRoutes = require('./src/cart/cart.route')
const orderRoutes = require('./src/orders/order.route')
const adminRoutes = require('./src/users/user.route')

app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)
//nmwlI9Jvtjmg8HZd


async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use("/", (req, res) => {
    res.send("Book Store Server is running!");
  });
}

main().then(() => console.log("Mongodb connect successfully!")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})