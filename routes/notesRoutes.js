const router = require("express").Router();
const { ok } = require("assert");
const fs = require("fs");
const path = require("path");
const db = "./db/db.json";
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  fs.readFile(db, "utf-8", (err, data) => {
    if (err) {
      console.log("File not read", err);
      return;
    }
    dataAArray = JSON.parse(data);
    res.json(dataAArray);
  });
});

router.post("/", ({ body }, res) => {
  console.log("body", body);
  const jsonData = JSON.parse(fs.readFileSync(db, "utf-8")) || [];
  body.id = uuidv4();
  jsonData.push(body);

  const info = JSON.stringify(jsonData, null, 2);

  fs.writeFile(db, info, (err) => {
    if (err) throw err;

    console.log("New information is now saved in notes");

    res.json(body);
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const notes = JSON.parse(fs.readFileSync(db, "utf-8")) || [];

  const savedNotes = notes.filter((note) => note.id !== id);
  res.status(200).json({ ok: true });
  fs.writeFileSync(db, JSON.stringify(savedNotes, null, 2));

  if (savedNotes === notes) {
    res.status(400).json.apply({ message: "Not found" });
  }
});
module.exports = router;
