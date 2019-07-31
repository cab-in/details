DROP DATABASE IF EXISTS cabin;
CREATE DATABASE cabin;
\connect cabin;

CREATE TABLE listings(
  id SERIAL PRIMARY KEY,
  title varchar(100) NOT NULL,
  location varchar(50) NOT NULL,
  hosts_id INT,
  spaces_id INT,
  max_guests INT NOT NULL,
  room_number INT NOT NULL,
  bed_number INT NOT NULL,
  bed_type varchar(50) NOT NULL,
  bath_number INT NOT NULL,
  spaceDescIntro text NOT NULL,
  spaceDesc text NOT NULL,
  guestAccessDesc text,
  guestInteraction text,
  others text, 
  license text NOT NULL
);

CREATE TABLE hosts(
  id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  pic text NOT NULL
);

CREATE TABLE listings_highlights(
  listings_id INT,
  highlights_id INT
);

CREATE TABLE highlights(
  id SERIAL PRIMARY KEY,
  highlights_type varchar(50)
);

CREATE TABLE listings_amenities(
  listings_id INT,
  amenities_id INT
);

CREATE TABLE amenities(
  id SERIAL PRIMARY KEY,
  amenities_name text NOT NULL,
  amenities_desc text
);

CREATE TABLE spaces(
  id SERIAL PRIMARY KEY,
  type varchar (50) NOT NULL
);

/*
POSTGRES COPY COMMANDS 

\copy listings (title, location, hosts_id, spaces_id, max_guests, room_number, bed_number, bed_type, bath_number, spaceDescIntro, spaceDesc, guestAccessDesc, guestInteraction, others, license) FROM '/Users/Kenny/Listing/listings.csv' DELIMITER ',' CSV;
\copy hosts (name, pic) FROM '/Users/Kenny/Listing/hosts.csv' DELIMITER ',' CSV;
\copy listings_highlights (listings_id, highlights_id) FROM '/Users/Kenny/Listing/listings_highlights.csv' DELIMITER ',' CSV;
\copy highlights (highlights_type) FROM '/Users/Kenny/Listing/highlights.csv' DELIMITER ',' CSV;
\copy listings_amenities (listings_id, amenities_id) FROM '/Users/Kenny/Listing/listings_amenities.csv' DELIMITER ',' CSV;
\copy amenities (amenities_name, amenities_desc) FROM '/Users/Kenny/Listing/amenities.csv' DELIMITER ',' CSV;
\copy spaces (type) FROM '/Users/Kenny/Listing/spaces.csv' DELIMITER ',' CSV;
*/


/*
POSTGRES ADD FOREIGN KEY TO EXISTING TABLE

alter table listings add constraint fk_links_listings_hosts foreign key (hosts_id) references hosts(id);
alter table listings add constraint fk_links_listings_spaces foreign key (spaces_id) references spaces(id);
alter table listings_highlights add constraint fk_links_listings_highlights_listings foreign key (listings_id) references listings(id);
alter table listings_highlights add constraint fk_links_listings_highlights_highlights foreign key (highlights_id) references highlights(id);
alter table listings_amenities add constraint fk_links_listings_amenities_listings foreign key (listings_id) references listings(id);
alter table listings_amenities add constraint fk_links_listings_amenities_amenities foreign key (amenities_id) references amenities(id);
*/

/*
POSTGRES QUERY SPEED DETAILS

explain analyze select * from highlights inner join listings_highlights on listings_highlights.highlights_id = highlights.id where listings_highlights.listings_id = 9999901;
explain analyze select * from amenities inner join listings_amenities on listings_amenities.amenities_id = amenities.id where listings_amenities.listings_id = 9999901;



*/



/*
POSTGRES INDEXING

dish_restaurant_photo_desc ====> IS A VARIABLE NAME

- CREATE INDEX dish_restaurant_photo_desc ON popular_dish(restaurant_id, photo_count DESC);




*/

/*
POSTGRES QUERYS

HIGHLIGHTS QUERY W/ ALL LISTINGS DETAILS (minimal amount of duplicates)

    select  
      *
    from 
      listings_highlights as LH
    inner join
      listings as L
      on LH.listings_id = L.id
    inner join
      highlights as H
      on LH.highlights_id = H.id
    where 
      L.id = 9999901;
  
AMENITIES QUERY
  
    select
      *
    from
      amenities
    inner join
      listings_amenities as LA
      on LA.amenities_id = amenities.id
    where
      LA.listings_id = 9999901;

HIGHLIGHTS QUERY
  
    select
      *
    from
      highlights
    inner join
      listings_highlights as LH
      on LH.highlights_id = highlights.id
    where
      LH.listings_id = 9999901;

LISTINGS QUERY

    select
      *
    from
      listings
    where
      listings.id = 9999901;

LISTINGS QUERY BY HIGHLIGHTS

    select
      *
    from
      listings
    inner join
      listings_highlights as LH
      on LH.listings_id = listings.id
    where
      LH.highlights_id = 1 limit 100;

LISTINGS QUERY BY AMENITIES

    select
      *
    from
      listings
    inner join
      listings_amenities as LA
      on LA.listings_id = listings.id
    where
      LA.amenities_id = 1 limit 100;

*/
