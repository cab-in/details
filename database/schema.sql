DROP DATABASE IF EXISTS cabin;
CREATE DATABASE cabin;
\connect cabin;

CREATE TABLE listings(
  id SERIAL PRIMARY KEY,
  title varchar(100) NOT NULL,
  location varchar(30) NOT NULL,
  spaceDescIntro text NOT NULL,
  spaceDesc text NOT NULL,
  guestAccessDesc text,
  others text, 
  license text NOT NULL,
  space_type text NOT NULL,
  max_guests INT NOT NULL,
  room_type text NOT NULL,
  bed_number INT NOT NULL,
  bath_number INT NOT NULL
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  listing_id INT REFERENCES listings(id),
  name varchar(30) NOT NULL,
  username varchar(30) NOT NULL,
  host BOOLEAN NOT NULL
);

CREATE TABLE highlights(
  id SERIAL PRIMARY KEY,
  listing_id INT REFERENCES listings(id),
  review_highlight text NOT NULL
);

/*
POSTGRES COPY COMMANDS 


\copy listings (title, location, spaceDescIntro, spaceDesc, guestAccessDesc, others, license, space_type, max_guests, room_type, bed_number, bath_number) FROM '/Users/Kenny/Listing/listingData.csv' DELIMITER ',' CSV;
\copy users (listing_id, name, username, host) FROM '/Users/Kenny/Listing/userData.csv' DELIMITER ',' CSV;
\copy highlights (listing_id, review_highlight) FROM '/Users/Kenny/Listing/highlightData.csv' DELIMITER ',' CSV;


*/