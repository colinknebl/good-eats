'use strict';
const fs = require('fs');
const fetch = require('node-fetch')

class Error {
  constructor(err) {
    this.message = err.message
    this.type = err.type
    this.errno = err.errno
    this.code = err.code
    this.date = this.customDate()
  }

  customDate() {
    let date = new Date(),
         hrs = date.getHours(),
        mins = date.getMinutes(),
        secs = date.getSeconds();
    let hours = hrs < 10 ? `0${hrs}` : hrs
    let minutes = mins < 10 ? `0${mins}` : mins
    let seconds = secs < 10 ? `0${secs}` : secs
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`
  }
}

fetch('http://blah')
  .then(data => console.log(data))
  .catch(err => {
    let errors = JSON.parse(fs.readFileSync('errorsTest.json'));
    let error = new Error(err)
    errors.log.push(error)
    errors = JSON.stringify(errors, null, 2)
    fs.writeFileSync('errorsTest.json', errors)
    console.log(`New error logged at ${error.date}`);
  })
  