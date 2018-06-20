'use strict';
const fs = require('fs');
let rawdata = fs.readFileSync('student.json');  
let data = JSON.parse(rawdata);
data.students.forEach(student => {
  console.log(student.name)
})

class Student {
  constructor(student) {
    this.name = student.name
    this.age = student.age
    this.gender = student.gender
    this.department = student.department
    this.car = student.car
  }
}

let colin = new Student({
  name: 'Colin',
  age: 26,
  gender: 'Male',
  department: 'Software Development',
  car: 'Honda'
})

let jessica = new Student({
  name: 'Jessica',
  age: 28,
  gender: 'Female',
  department: 'Child Wrangler',
  car: 'Mazda'
})
data.students.push(colin, jessica)

let json = JSON.stringify(data, null, 2)
fs.writeFileSync('student-3.json', json)


// 'use strict';
// const fs = require('fs');
// fs.readFile('student.json', (err, data) => {  
//     if (err) throw err;
//     let student = JSON.parse(data);
//     console.log(student);
// });
// console.log('This is after the read call');  


// 'use strict';
// let jsonData = require('./student.json');
// console.log(jsonData);  


// 'use strict';
// const fs = require('fs');
// let student = {  
//     name: 'Mike',
//     age: 23, 
//     gender: 'Male',
//     department: 'English',
//     car: 'Honda' 
// };
// let data = JSON.stringify(student, null, 2);  
// fs.writeFileSync('student-2.json', data);  