const router = require('express').Router();
const { validQuery, validUrl } = require('../helpers/validation');
const Urls = require('../database/urls-repository');

const prefix = '/api/urls'

// parameter structure and keys in the request query to verify and filter information
const getQuerySchema = {
    filter: {
        range: ['most-sites']
    },
    order: {
        range: ['views', 'created_at', 'full'],
    },
    sort: {
        range: ['asc', 'desc']
    },
    limit: {
        number: true,
    },
    part: {
        number: true,
    },
    search: null
}

router
    .post(prefix, (req, res) => {
        let url = req.body.url;
        // check the validity of the url entered by the client
        if (!validUrl(url)) {
            res.status(422).send({ error: "check url key and value in body request!" });
            return;
        }
        try {
            // register a record and url to shorten and save in the database
            res.status(200).send(Urls.insert(url));
        } catch (error) {
            res.status(500).send({ error: "something went wrong!" });
            console.log(error.message);
        }
    })

module.exports = router;