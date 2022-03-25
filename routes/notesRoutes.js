const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db = './db/db.json';

router.get('/', (req,res) =>{
 fs.readFile(db, 'utf-8', (err, data)=>{
   if (err){
     console.log('File not read', err);
     return;
   }
   dataAArray=JSON.parse(data);
   res.json(dataAArray);
 })
});

router.post('/', ({body},res) =>{
  console.log("body", body);
  jsonData.push(body);

  jsonData[jsonData.length - 1].id =jsonData. length - 1;

  const info =json.stringify(jsonData, null, 2)

  fs.writeFile(db, info, err =>{
    if (err) throw err;

    console.log("New information is now saved in notes");
  })
});

router.delete('/:id', (req,res) =>{
  const {id} = req.params;

  const deleted = notes.find(note => note.id == id);
  if(deleted){
    notes = note.filter(note => note.id !== id);
    res.status(200).json(deleted);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({notes}, null, 2)
    );
  }
  else{
res.status(400).json.apply({message: "Not found"});
  }
});
module.exports = router;