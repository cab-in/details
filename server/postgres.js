const { Pool } = require('pg');
const redis = require('redis');
const client = redis.createClient();

const pool = new Pool({
  user: 'Kenny',
  host: 'localhost',
  database: 'cabin',
  port: 5432
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const getListing = (req, res) => {
  const listingid = req.params.listingid;
  pool.query(`SELECT * FROM listings where id=${listingid}`, (error, results) => {
    if (error) {
      throw error
    }
    client.set(listingid, JSON.stringify(results.rows[0]), 'ex', 3600)
    res.status(200).send(results.rows)
  })
}

const postListing = (req, res) => {
  let { 
    title, location, hosts_id, spaces_id, max_guests, room_number, 
    bed_number, bed_type, bath_number, spaceDescIntro, spaceDesc, 
    guestAccessDesc, guestInteraction, others, license 
  } = req.body;
  console.log(req.body)
  pool.query('INSERT INTO listings(title, location, hosts_id, spaces_id, max_guests, room_number, bed_number, bed_type, bath_number, spaceDescIntro, spaceDesc, guestAccessDesc, guestInteraction, others, license) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *', [title, location, hosts_id, spaces_id, max_guests, room_number, bed_number, bed_type, bath_number, spaceDescIntro, spaceDesc, guestAccessDesc, guestInteraction, others, license],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send('added new listing')
    }
  )
}

const updateListing = (req, res) => {
  let { 
    title, location, hosts_id, spaces_id, max_guests, room_number, 
    bed_number, bed_type, bath_number, spaceDescIntro, spaceDesc, 
    guestAccessDesc, guestInteraction, others, license 
  } = req.body;
  console.log(`req.body = `, req.body)
  let id = req.params.listingid;
  console.log(`id: `, id)
  pool.query(`UPDATE listings SET title = $1, location = $2, hosts_id = $3, spaces_id = $4, max_guests = $5, room_number = $6, bed_number = $7, bed_type = $8, bath_number = $9, spaceDescIntro = $10, spaceDesc = $11, guestAccessDesc = $12, guestInteraction = $13, others = $14, license = $15 WHERE id = $16`, [title, location, hosts_id, spaces_id, max_guests, room_number, bed_number, bed_type, bath_number, spaceDescIntro, spaceDesc, guestAccessDesc, guestInteraction, others, license, id],
  (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`updated listing ${id}`)
  })
};

const deleteListing = (req, res) => {
  let id = req.params.listingid;
  console.log(id)
  pool.query(`DELETE FROM listings WHERE id=${id}`, (error, results) => {
    if (error) {
      throw error
    }
    res.send(`deleted listing: ${id}`);
  });
}

module.exports = {
  getListing,
  postListing,
  updateListing,
  deleteListing
}