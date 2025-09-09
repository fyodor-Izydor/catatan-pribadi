"use strict";
exports.__esModule = true;
exports.db = exports.auth = void 0;
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyD2WFqUoCqvJA3gU8wr7D1jbQBtJzYKbrk",
    authDomain: "catatan-pribadi-4e294.firebaseapp.com",
    projectId: "catatan-pribadi-4e294",
    storageBucket: "catatan-pribadi-4e294.firebasestorage.app",
    messagingSenderId: "383956212715",
    appId: "1:383956212715:web:11575f4f9d79bb248ad7ae",
    measurementId: "G-GYC0W9BJ9G"
};
var app = app_1.initializeApp(firebaseConfig);
exports.auth = auth_1.getAuth(app);
exports.db = firestore_1.getFirestore(app);
