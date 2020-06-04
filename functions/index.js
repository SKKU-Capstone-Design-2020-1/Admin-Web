const functions = require('firebase-functions');
const admin = require("firebase-admin");

const serviceAccount = require("./config/seat-reservation-2600f-firebase-adminsdk-jllvn-0943411cf8.json");
const cors = require('cors')({ origin: true })

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://seat-reservation-2600f.firebaseio.com"
})

const db = admin.firestore();
const auth = admin.auth();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


exports.checkToken = functions.https.onRequest((req, res) => {
    cors(req, res, () => { });
    const { idToken } = req.body;

    auth.verifyIdToken(idToken).then(decoded => {
        return res.send({
            success: true,
            user: decoded,
        })
    }).catch(err => {
        console.log(err);
        return res.status(400).send({
            success: false,
            err: err.message
        })
    })

});
exports.checkReserves = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {

        const reserveSnap = await db.collection(`qr_reserves`).where("returned_at", "<=", new Date()).get();


        const batch = db.batch();
        const promises = [];
        const reserves = [];

        for (let doc of reserveSnap.docs) {
            batch.delete(db.doc(`qr_reserves/${doc.id}`));

            let rdata = doc.data();
            const path = `stores/${rdata.sid}/seatGroups/${rdata.seat_group_id}`;
            reserves.push({
                ...rdata,
                path
            });
            promises.push(db.doc(path).get());
        }

        const promiseSnap = await Promise.all(promises);


        let idx = 0;
        for (let seatgroup of promiseSnap) {
            const data = seatgroup.data();

            const updated_seats = data.seats.map(seat => {
                if (seat.id === reserves[idx].id) {
                    return {
                        ...seat,
                        status: 0
                    }
                }
                else return seat;
            });


            console.log(reserves[idx]);
            batch.update(db.doc(reserves[idx].path), {
                seats: updated_seats
            })
            idx++;
        }

        await batch.commit();
        return res.send({
            success: true,
            data: reserves,
        });
    })
})

