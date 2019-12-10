const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const getWeather = require('./lib/getWeather');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs',hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.set('view engine','.hbs');

app.get('/', async(req, res) => {

    res.render('index', );
    
});
app.post('/',async(req,res) => {
    let location = req.body.location;
    let country= req.body.country;
    console.log(country);
    console.log(location);
    let data = await getWeather(location,country);

    let Description = ` ${data.list[0].weather[0].description} `;
    let Temperature = ` ${data.list[0].main.temp} C `;
    let Humidity =    ` ${data.list[0].main.humidity} % `;
    let WindSpeed =   ` ${data.list[0].wind.speed} meter/sec `;
    let CloudCover =  ` ${data.list[0].clouds.all} % `;
    res.render('index',{data: {Temperature , Humidity , WindSpeed  ,CloudCover , Description}})

});

app.listen(3000, () => {
    console.log('Your Sever is running on Port 3000')
}) 