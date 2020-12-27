const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const configMensaje = require("./enviar");
const admin = require("firebase-admin"); //para uso de la bd

var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseUrl: "https://papeleria-f3646.firebaseio.com",
});

const db = admin.firestore();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/", (req, res) => {
  configMensaje(req.body);
  res.status(200).send();
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//leer la bd
app.get("/api/read", (req, res) => {
  (async () => {
    try {
      let query = db.collection("Productos");
      let response = [];
      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            descripcion: doc.data().descripcion,
            existencia: doc.data().existencia,
            marca: doc.data().marca,
            precio: doc.data().precio,
          };
          response.push(selectedItem);
        }
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

exports.app = functions.https.onRequest(app);
