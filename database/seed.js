const faker = require('faker');
const db = require('./index')

const fs = require('fs');
const listingWriter = fs.createWriteStream('listingData.csv');
const userWriter = fs.createWriteStream('userData.csv');
const highlightWriter = fs.createWriteStream('highlightData.csv');

const createListingData = () => {
  let companyName = faker.company.companyName();
  let spaceDescIntro = faker.lorem.paragraph().split('\n').join();
  let spaceDesc = faker.lorem.paragraphs().split('\n').join('').split(/\s/).join(' ');
  let guestAccessDesc = faker.lorem.paragraph().split('\n').join();
  let othersDesc = faker.lorem.paragraph().split('\n').join();
  let spaceType = faker.lorem.sentence(4);
  if (spaceType.includes(',')) {
    spaceType = spaceType.split(',').join('');
  }
  if (companyName.includes(',')) {
    companyName = companyName.split(',').join('');
  }
  return `${companyName}, ${faker.address.city()}, ${spaceDescIntro}, ${spaceDesc}, ${guestAccessDesc}, ${othersDesc}, ${'STR-0000' + faker.random.number({min: 100, max: 999})}, ${spaceType}, ${faker.random.number({min: 1, max: 6})}, ${faker.lorem.sentence()}, ${faker.random.number({min: 1, max: 3})}, ${faker.random.number({min: 1, max: 2})}\n`
}
// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
function writeListingTenMillionTimes(writer, data, encoding, callback) {
  console.time('writeListingTenMillionTimes');
  let i = 1000000;
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

let j = 1000001;
const createUserData = () => {
  j--;
  return `${j}, ${faker.name.findName()}, ${faker.internet.userName()}, ${faker.random.boolean()}\n`
}
function writeUserTenMillionTimes(writer, data, encoding, callback) {
  console.time('writeUserTenMillionTimes');
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 1) {
        // Last time!
        console.timeEnd('writeUserTenMillionTimes');
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
      // console.log('id: ' + i);
      writer.once('drain', write);
    }
  }
}
writeUserTenMillionTimes(userWriter, createUserData, 'utf8');

let k = 1000001;
const createHighlightData = () => {
  k--;
  let reviewHighlight = faker.lorem.sentence(4);
  if (reviewHighlight.includes(',')) {
    reviewHighlight = reviewHighlight.split(',').join('');
  }
  return `${k}, ${reviewHighlight}\n`
}
function writeHighlightTenMillionTimes(writer, data, encoding, callback) {
  console.time('writeHighlightTenMillionTimes');
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 1) {
        // Last time!
        console.timeEnd('writeHighlightTenMillionTimes');
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
      // console.log('id: ' + i);
      writer.once('drain', write);
    }
  }
}
writeHighlightTenMillionTimes(highlightWriter, createHighlightData, 'utf8');
