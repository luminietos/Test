const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require('path');
const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));

// THE MAIN, LANDING & DEFAULT PAGE
app.get("/", function (_req, res) {
  // redirecting page to index html file
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// THE GUESTBOOK PAGE
app.get("/guestbook", (_req, res) => {
  fs.readFile("jsondata.json", (err, data) => {
    if (err) {
      res.status(500).send("Error loading data");
      return;
    }

    const jsonData = JSON.parse(data);

    let results = `
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Country</th>
            <th>Date</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
    `;
    for (let i = 0; i < jsonData.length; i++) {
      results += `
        <tr>
          <td>${jsonData[i].id}</td>
          <td>${jsonData[i].username}</td>
          <td>${jsonData[i].country}</td>
          <td>${jsonData[i].date}</td>
          <td>${jsonData[i].message}</td>
        </tr>
    `;
    }
    results += `
        </tbody>
      </table>
    `;

    res.send(results);
  });
});

// THE NEW ENTRY PAGE
app.get("/newmessage", function (_req, res) {
  res.sendFile(__dirname + "/newmessage.html");
});

// SENDING DATA TO JSON FILE
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.post("/submit", function(req, res) {
//   var data = req.body;

//   fs.readFile("jsondata.json", function(err, fileData) {
//       if (err) {
//           console.error(err);
//           res.status(500).send("Error reading data file.");
//           return;
//       }

//       var jsonData = JSON.parse(fileData);
      
//       jsonData.push(data);

//       fs.writeFile("jsondata.json", JSON.stringify(jsonData), function(err) {
//           if (err) {
//               console.error(err);
//               res.status(500).send("Error");
//               return;
//           }
//           res.send("Data successfully written to file.");
//       });
//   });
// });

// AJAX 
app.get("/ajaxmessage", function (_req, res) {
  res.send("AJAX ROUTE");
});

// THE ERROR FUNCTION
app.get("*", function (_req, res) {
  res.status(404).send("Can't find requested page");
});

// PORT
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
