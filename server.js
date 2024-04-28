const express = require('express');
const app = express();
const port = 3000; 
const cors = require('cors');
app.use(express.json());
app.use(cors());

const { myconnection } = require('./connection');

app.get('/Coffee', (req, res) => {

    myconnection.query('SELECT * FROM coffee JOIN nutrition ON coffee.c_id = nutrition.c_id', function (error, results) {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

app.post('/cart', (req,res) =>{
    const {coffeeName, coffeePrice}= req.body;
    if (coffeeName && coffeePrice){
    myconnection.query('INSERT INTO cart (coffee_name, coffee_price) VALUES (?, ?)',[coffeeName, coffeePrice],
    (error, results) => {
        if(error){
            console.error(error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
        res.status(200).json({message: 'Added to Cart Successfully'});
    });
} else{
    res.status(400).json({ error: 'Missing data' });
}
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
