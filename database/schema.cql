DROP KEYSPACE IF EXISTS cabin;

CREATE KEYSPACE cabin
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

USE cabin;

CREATE TABLE listings(
  id int,
  title text,
  location text,
  hosts text,
  highlights text,
  amenities text,
  spaces text,
  max_guests int,
  room_number int,
  bed_number int,
  bed_type text,
  bath_number int,
  spaceDescIntro text,
  spaceDesc text,
  guestAccessDesc text,
  guestInteraction text,
  others text, 
  license text,
  PRIMARY KEY (id)
);

CREATE TABLE highlights(
  id int,
  highlight text,
  code int,
  PRIMARY KEY (id, code)
);

CREATE TABLE amenities(
  id int,
  amenity text,
  code int,
  PRIMARY KEY (id, code)
);


/*
nodetool garbagecollect cabin amenities



copy listings (id, title, location, hosts, highlights, amenities, spaces, max_guests, room_number, bed_number, bed_type, bath_number, spaceDescIntro, spaceDesc, guestAccessDesc, guestInteraction, others, license) from '/Users/Kenny/Listing/cas_listings.csv' with header = 'false';
copy highlights (id, highlight, code) from '/Users/Kenny/Listing/cas_highlights.csv' with header = 'false';
copy amenities (id, amenity, code) from '/Users/Kenny/Listing/cas_amenities.csv' with header = 'false';


copy listings (id, title, location, hosts, highlights, amenities, spaces, max_guests, room_number, bed_number, bed_type, bath_number, spaceDescIntro, spaceDesc, guestAccessDesc, guestInteraction, others, license) from '/Users/Kenny/Listing/cas_listings.csv' with chunksize=1;




line count

cat cas_amenities.csv  | wc -l



cassandra-loader


./cassandra-loader -f /Users/Kenny/Listing/cas_listings.csv -host localhost -schema 'cabin.listings(id, title, location, hosts, highlights, amenities, spaces, max_guests, room_number, bed_number, bed_type, bath_number, spaceDescIntro, spaceDesc, guestAccessDesc, guestInteraction, others, license)'
./cassandra-loader -f /Users/Kenny/Listing/cas_highlights.csv -host localhost -schema 'cabin.highlights(id, highlight, code)'
./cassandra-loader -f /Users/Kenny/Listing/cas_amenities.csv -host localhost -schema 'cabin.amenities(id, amenity, code)'





*/