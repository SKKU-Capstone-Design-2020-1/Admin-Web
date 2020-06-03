const functions = require('firebase-functions');
const admin = require("firebase-admin");
const serviceAccount = require("./config/seat-reservation-2600f-firebase-adminsdk-jllvn-0943411cf8.json");
const cors = require('cors')({ origin: true })

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://seat-reservation-2600f.firebaseio.com"
})

const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


exports.checkReserves = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const reserveSnap = await db.collection(`qr_reserves`).get();
        for (let doc of reserveSnap.docs){
            console.log(doc.data());
        }

        return res.send("hey");
    })
})

