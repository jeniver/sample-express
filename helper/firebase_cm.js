const admin = require('firebase-admin');

const { Ok, ServerError, BadRequest, Unauthorised, NotFound, Forbidden } = require('../helper/api-error')

const serviceAccount = require('../config/saravanababa-1119c.json');


const formatError = (error) => {
    if (!error) return ServerError("Unknown error", error)
    const { statusCode } = error
    switch (statusCode) {
        case 400:
            return BadRequest(error)
        case 401:
            return Unauthorised(error)
        case 403:
            return Forbidden(error)
        case 404:
            return NotFound(error)
        default:
            return ServerError(error)
    }

}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function sendNotificationToDevice(token, notification, data = null) {
  const registrationToken = 'ftsg3es2fFdx7Foz32uuaU:APA91bHxxpVJn4QCHyFRQj6IhoXXimu34Riwu1sT8vdYG9D1XTBwzdQBKPO27AFdM_2dMefVC7xVzqly_FrKxrcqToIKB6-lMGiWeVXFzKlYZJm4G8600qH_fdWv9Xc0ZR7zk6884Vn8';

const message = {
  data: {
    title: "$FooCorp up 1.43% on the day",
    body: "$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.",
  },
  token: registrationToken,
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
  
}


// async function generateVAPIDKeys() {  
//   var curve = crypto.createECDH('prime256v1');  
//   curve.generateKeys();
// console.log(curve.getPublicKey(), curve.getPrivateKey())
//   return {  
//     publicKey: curve.getPublicKey(),  
//     privateKey: curve.getPrivateKey(),  
//   };  
// }


/* ----
token: user fcm token saved in user model fcm_token
notification: {
  title: '',
  body: '',
},
// optional
data: {} // can send anything
}

*/

module.exports = {
  sendNotificationToDevice,

};
