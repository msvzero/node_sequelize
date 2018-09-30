const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const Shop = require('./models').Shop;
const Coffe = require('./models').Coffe;

// Shop.create( {
//     name: "Starbucks"
// })
// .then(shop => {
//     shop.createCoffe({
//         name: "Columbian",
//         type: "Dak"
//     }).then(() => console.log('Worked!'));
// })

// Shop.findAll({
//     include: [Coffe]
// }).then(shops => {
//     console.log(shops[0].Coffes);
// })
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Rutas
app.get('/', (req, res) => {
    Shop.findAll({
        include: [Coffe]
    }).then(shops => {
        res.render('index', {shops: shops})
    })
})

app.post('/shops', (req, res) => {
    Shop.create(req.body)
    .then(() => res.redirect('/'))
})

app.post('/coffe/:shop_id',(req, res) => {
    Coffe.create({
        ...req.body, shopId: req.params.shop_id
    })
    .then(() => res.redirect('/'))
} )


app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
})

