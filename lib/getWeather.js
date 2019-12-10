const request = require('request');
const{promisify} = require('util');


const promisifyRequest = promisify(request);

const getWeather = async (location,country) => {
    let data = await promisifyRequest({
       uri: `https://api.openweathermap.org/data/2.5/find?q=${location},${country}&units=metric&APPID=fa38571dc2a009c171b1498b3dd16c13`,
       json: true
    });
    (err,res)=>{
        if(err) throw err;
        console.log(res.body);
    }

    return data.body;
}

module.exports = getWeather;