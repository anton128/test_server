var express = require('express');
var router = express.Router();
var TrackContent = require('../model/track');
var axios = require('axios');

router.post('/', function(req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const { name } = req.body;

    getAddress(ip).then(response => {
        if (response.status) {
            const {country, state, city} = response.data;
            const message = `IP: ${ip}, Country: ${country}, State: ${state}, City: ${city}`;

            // send email
            // const msg = {
            //     to: process.env.EMAIL_TO,
            //     from: 'portfolio@support.com',
            //     subject: `${name} Portfolio from `,
            //     text: message,
            // };
            // store to db
            var newTrackContent = new TrackContent({
                ip: ip,
                country: country,
                state: state,
                city: city,
                name: name,
                visited_on: Date.now()
            });
            newTrackContent.save();
        }
        res.send("ok");
    });
});

router.get('/', function(req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    getAddress(ip).then(response => {
        if (response.status) {
            const {country, state, city} = response.data;
            console.log(response);
            var newTrackContent = new TrackContent({
                ip: ip,
                country: country,
                state: state,
                city: city,
                name: name,
                visited_on: Date.now()
            });
            newTrackContent.save();
            return res.send({ip, country, state, city});
        }
        next();
    });
});

router.get('/fetch', function(req, res) {
    TrackContent.find({}, null, {sort: {visited_on: -1}}, function(err, data) {
        if (err)
            return res.status(500).json({ message: 'Error', error: err });

        res.status(200).json({ data });
    });
});
router.delete('/', function(req, res) {
    TrackContent.remove({}, function(err, data) {
        if (err)
            return res.status(500).json({ message: 'Error', error: err });

        res.status(200).json({});
    });
});

const getAddress = (ip) => {
    return new Promise((resolve) => 
        {
            const url = `http://www.geoplugin.net/json.gp?ip=${ip}`;
            axios.get(url)
            .then( response => { 
                return resolve({
                    status: true,
                    data: {
                        country: response.data.geoplugin_countryName,
                        city: response.data.geoplugin_city,
                        state: response.data.geoplugin_regionName
                    }
                });
            } )
            .catch( response => {
                return resolve({
                    status: false
                })
            } );
        }
    );
};

module.exports = router;
