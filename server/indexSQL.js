require('newrelic');
//server
const express = require('express');

const redis = require('redis');
const client = redis.createClient();

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const controllers = require('./postgres')
const router = express.Router();

function cache(req, res, next) {
  const id = req.params.listingid;
  client.get(id, function (err, data) {
      if (err) throw err;

      if (data != null) {
        console.log('sent from cache')
        res.send(JSON.parse(data));
      } else {
          next();
      }
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);


app.use('/:listingid',express.static("public"));


router.get('/api/:listingid/details', cache, controllers.getListing)

router.post('/api/details', controllers.postListing)

router.put('/api/:listingid/details', controllers.updateListing)

router.delete('/api/:listingid/details', controllers.deleteListing)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));




// scp -i /Users/Kenny/Downloads/Cabin_Listings.pem /Users/Kenny/Listing/listings1.csv ec2-user@ec2-3-14-80-124.us-east-2.compute.amazonaws.com:.


// scp -i /Users/Kenny/Downloads/Cabin_Listings_Service5.pem /Users/Kenny/Downloads/loaderio-557041e69178d45b366696985eac4b68.txt ec2-user@ec2-18-218-196-208.us-east-2.compute.amazonaws.com:.


// router.get('/loaderio-557041e69178d45b366696985eac4b68', (req, res) => {
//   res.sendFile('/home/ec2-user.loaderio-557041e69178d45b366696985eac4b68.txt');
// });