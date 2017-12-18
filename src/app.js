const express = require('express')
const path = require('path')
const app = express()

app.set('views', path.join(__dirname, './views/'));
app.set('view engine', 'pug');

const fs = require('fs')

const readFile = (path) =>{
  return new Promise((resolve, reject)=>{
    fs.readFile(path.join(__dirname, path), 'utf8', (err, data)=>{
      if(err){reject(err)}
      resolve(data)
    })
  })
}

app.get('/', (req, res, next)=>{

  fs.readFile(path.join(__dirname, '../src/css/index.css'), 'utf8', (err, data)=>{
    console.log(err);
    console.log(data);
    res.render('index', {
      title: 'dfhgjdfh',
      youAreUsingPug: true,
      styles: data
    });
  });

})


app.listen(3000,()=>{
  console.log(118220361);
})
