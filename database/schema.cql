DROP KEYSPACE IF EXISTS cabin;
CREATE KEYSPACE cabin;
USE cabin;

CREATE TABLE listings(
  id int,
  title text,
  location text,
  hosts text,
  spaces text,
  highlights <text>,
  amenities <text>
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
  license text
);