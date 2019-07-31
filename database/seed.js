const faker = require('faker');
const db = require('./index')

const fs = require('fs');
const listingWriter = fs.createWriteStream('listings.csv');
const hostWriter = fs.createWriteStream('hosts.csv');
const listingsHighlightsWriter = fs.createWriteStream('listings_highlights.csv');
const highlightWriter = fs.createWriteStream('highlights.csv');
const listingsAmenitiesWriter = fs.createWriteStream('listings_amenities.csv');
const amenityWriter = fs.createWriteStream('amenities.csv');
const spaceWriter = fs.createWriteStream('spaces.csv');

let j = 10000001;
const createListingData = () => {
  j--;
  let companyName = faker.company.companyName();
  let spaceDescIntro = faker.lorem.paragraph().split('\n').join();
  let spaceDesc = faker.lorem.paragraphs().split('\n').join('').split(/\s/).join(' ');
  let guestAccessDesc = faker.lorem.paragraph().split('\n').join();
  let othersDesc = faker.lorem.paragraph().split('\n').join();
  let guestInteraction = faker.lorem.paragraph().split('\n').join();
  let spaceType = faker.lorem.sentence(4);
  if (spaceType.includes(',')) {
    spaceType = spaceType.split(',').join('');
  }
  if (companyName.includes(',')) {
    companyName = companyName.split(',').join('');
  }
  if (j % 3 === 0) {
    guestInteraction = '';
  }
  return `${companyName}, ${faker.address.city()}, ${j}, ${faker.random.number({min: 1, max: 4})}, ${faker.random.number({min: 1, max: 6})}, ${faker.random.number({min: 1, max: 2})}, ${faker.random.number({min: 1, max: 2})}, ${faker.lorem.words(2)}, ${faker.random.number({min: 1, max: 2})}, ${spaceDescIntro}, ${spaceDesc}, ${guestAccessDesc}, ${guestInteraction}, ${othersDesc}, ${'STR-0000' + faker.random.number({min: 100, max: 999})}\n`
}
// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
function writeListingTenMillionTimes(writer, data, encoding, callback) {
  console.time('writeListingTenMillionTimes');
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 1) {
        // Last time!
        console.timeEnd('writeListingTenMillionTimes');
        writer.write(data(), encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data(), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
writeListingTenMillionTimes(listingWriter, createListingData, 'utf8');

let k = 10000001;
const createHostData = () => {
  k--;
  return `${faker.name.findName()}, ${faker.internet.url()}\n`
}
function writeHostTenMillionTimes(writer, data, encoding, callback) {
  console.time('writeHostTenMillionTimes');
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 1) {
        // Last time!
        console.timeEnd('writeHostTenMillionTimes');
        writer.write(data(), encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data(), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
writeHostTenMillionTimes(hostWriter, createHostData, 'utf8');

const createListingsHighlightsData = (i, j) => {
  return `${i}, ${j}\n`
}
function writeListingHighlightsTenMillionTimes(writer, data, encoding, callback) {
  console.time('writeListingHighlightsTenMillionTimes');
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      if (i === 1) {
        // Last time!
        console.timeEnd('writeListingHighlightsTenMillionTimes');
        for (var j = 1; j <= faker.random.number({min: 1, max: 3}); j++) {
          writer.write(data(i, j), encoding, callback);
        }
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        
        for (var j = 1; j <= faker.random.number({min: 1, max: 3}); j++) {
          ok = writer.write(data(i, j), encoding);
        }
        
      }
      i--;
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
writeListingHighlightsTenMillionTimes(listingsHighlightsWriter, createListingsHighlightsData, 'utf8');

const createListingsAmenitiesData = (i, j) => {
  return `${i}, ${j}\n`
}
function writeListingAmenitiesTenMillionTimes(writer, data, encoding, callback) {
  console.time('writeListingAmenitiesTenMillionTimes');
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      if (i === 1) {
        // Last time!
        console.timeEnd('writeListingAmenitiesTenMillionTimes');
        for (var j = 1; j < faker.random.number({min: 10, max: 18}); j++) {
          writer.write(data(i, j), encoding, callback);
        }
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        for (var j = 1; j < faker.random.number({min: 10, max: 18}); j++) {
          ok = writer.write(data(i, j), encoding);
        }
        
      }
      i--;
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
writeListingAmenitiesTenMillionTimes(listingsAmenitiesWriter, createListingsAmenitiesData, 'utf8');

const createHighlightData = (i) => {
  let reviewHighlight1 = faker.lorem.sentence(4);
  if (reviewHighlight1.includes(',')) {
    reviewHighlight1 = reviewHighlight1.split(',').join('');
  }
  return `${reviewHighlight1}\n`
}
function writeHighlights(writer, data, encoding, callback) {
  console.time('writeHighlights');
  let i = 5;
  write();
  function write() {
    let ok = true;
    do {
      if (i === 1) {
        // Last time!
        console.timeEnd('writeHighlights');
        writer.write(data(i), encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data(i), encoding);
      }
      i--;
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
writeHighlights(highlightWriter, createHighlightData, 'utf8');

const createAmenityData = (i) => {
  let amenityName = faker.lorem.words(1);
  let amentityDesc = '';
  if (i % 4 === 0) {
    amentityDesc = faker.lorem.words();
  }
  return `${amenityName}, ${amentityDesc}\n`
}
function writeAmenity(writer, data, encoding, callback) {
  console.time('writeAmenity');
  let i = 18;
  write();
  function write() {
    let ok = true;
    do {
      if (i === 1) {
        // Last time!
        console.timeEnd('writeAmenity');
        writer.write(data(i), encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data(i), encoding);
      }
      i--;
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
writeAmenity(amenityWriter, createAmenityData, 'utf8');

const createSpaceData = () => {
  return `${faker.lorem.words(3)}\n`
}
function writeSpace(writer, data, encoding, callback) {
  console.time('writeSpace');
  let i = 4;
  write();
  function write() {
    let ok = true;
    do {
      if (i === 1) {
        // Last time!
        console.timeEnd('writeSpace');
        writer.write(data(), encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data(), encoding);
      }
      i--;
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
writeSpace(spaceWriter, createSpaceData, 'utf8');
