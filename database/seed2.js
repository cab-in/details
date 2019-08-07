const faker = require('faker');

const fs = require('fs');
const listingWriter = fs.createWriteStream('cas_listings.csv');
const amenityWriter = fs.createWriteStream('cas_amenities.csv');
const highlightWriter = fs.createWriteStream('cas_highlights.csv');

var count = 1564642800

const createAmenityData = (i) => {
  count--;
  return `${i}, ${faker.lorem.words()}, ${count}\n`
}

const createHighlightsData = (i) => {
  count--;
  return `${i}, ${faker.lorem.words()}, ${count}\n`
}

const createListingData = (i) => {
  let highlights = faker.lorem.sentence()
  let amenities = faker.lorem.sentence()
  let spaceDescIntro = faker.lorem.sentence()
  let spaceDesc = faker.lorem.sentence()
  let guestAccessDesc = faker.lorem.sentence()
  let othersDesc = faker.lorem.sentence()
  let guestInteraction = faker.lorem.sentence()
  return `${i}, ${faker.lorem.words()}, ${faker.address.city()}, ${faker.lorem.words(2)}, ${highlights}, ${amenities}, ${faker.lorem.words(3)}, ${faker.random.number({min: 1, max: 6})}, ${faker.random.number({min: 1, max: 2})}, ${faker.random.number({min: 1, max: 2})}, ${faker.lorem.words(2)}, ${faker.random.number({min: 1, max: 2})}, ${spaceDescIntro}, ${spaceDesc}, ${guestAccessDesc}, ${guestInteraction}, ${othersDesc}, ${'STR-0000' + faker.random.number({min: 100, max: 999})}\n`
}

function writeTenMillionTimes(encoding, callback) {
  console.time('writeTenMillionTimes');
  let i = 5000000;
  write();
  function write() {
    let ok = true;
    do {
      if (i === 1) {
        // Last time!
        console.timeEnd('writeTenMillionTimes');
        // for (var j = 1; j <= faker.random.number({min: 3, max: 6}); j++) {
        //   highlightWriter.write(createHighlightsData(i), encoding);
        // }
        // for (var k = 1; k <= faker.random.number({min: 10, max: 18}); k++) {
        //   amenityWriter.write(createAmenityData(i), encoding);
        // }
        listingWriter.write(createListingData(i), encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        // for (var j = 1; j <= faker.random.number({min: 3, max: 6}); j++) {
        //   highlightWriter.write(createHighlightsData(i), encoding);
        // }
        // for (var k = 1; k <= faker.random.number({min: 10, max: 18}); k++) {
        //   amenityWriter.write(createAmenityData(i), encoding);
        // }
        ok = listingWriter.write(createListingData(i), encoding);
        // console.log(!!ok, i);
      }
      i--;
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      // highlightWriter.once('drain', write);
      // amenityWriter.once('drain', write);
      listingWriter.once('drain', write);
    }
  }
}
writeTenMillionTimes('utf8');

function writeAmenitiesTenMillionTimes(encoding, callback) {
  console.time('writeAmenitiesTenMillionTimes');
  let i = 5000000;
  write();
  function write() {
    let ok = true;
    do {
      if (i === 1) {
        // Last time!
        console.timeEnd('writeAmenitiesTenMillionTimes');
        // for (var j = 1; j <= faker.random.number({min: 3, max: 6}); j++) {
        //   highlightWriter.write(createHighlightsData(i), encoding);
        // }
        for (var k = 1; k <= faker.random.number({min: 10, max: 18}); k++) {
          amenityWriter.write(createAmenityData(i), encoding);
        }
        // listingWriter.write(createListingData(i), encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        // for (var j = 1; j <= faker.random.number({min: 3, max: 6}); j++) {
        //   highlightWriter.write(createHighlightsData(i), encoding);
        // }
        for (var k = 1; k <= faker.random.number({min: 10, max: 18}); k++) {
          ok = amenityWriter.write(createAmenityData(i), encoding);
        }
        // ok = listingWriter.write(createListingData(i), encoding);
        // console.log(!!ok, i);
      }
      i--;
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      // highlightWriter.once('drain', write);
      amenityWriter.once('drain', write);
      // listingWriter.once('drain', write);
    }
  }
}
writeAmenitiesTenMillionTimes('utf8');

function writeHighlightTenMillionTimes(encoding, callback) {
  console.time('writeHighlightTenMillionTimes');
  let i = 5000000;
  write();
  function write() {
    let ok = true;
    do {
      if (i === 1) {
        // Last time!
        console.timeEnd('writeHighlightTenMillionTimes');
        for (var j = 1; j <= faker.random.number({min: 3, max: 6}); j++) {
          highlightWriter.write(createHighlightsData(i), encoding);
        }
        // for (var k = 1; k <= faker.random.number({min: 10, max: 18}); k++) {
        //   amenityWriter.write(createAmenityData(i), encoding);
        // }
        // listingWriter.write(createListingData(i), encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        for (var j = 1; j <= faker.random.number({min: 3, max: 6}); j++) {
          ok = highlightWriter.write(createHighlightsData(i), encoding);
        }
        // for (var k = 1; k <= faker.random.number({min: 10, max: 18}); k++) {
        //   amenityWriter.write(createAmenityData(i), encoding);
        // }
        // ok = listingWriter.write(createListingData(i), encoding);
        // console.log(!!ok, i);
      }
      i--;
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      highlightWriter.once('drain', write);
      // amenityWriter.once('drain', write);
      // listingWriter.once('drain', write);
    }
  }
}
writeHighlightTenMillionTimes('utf8');