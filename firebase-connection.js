/*
 * TRIBAL COMBAT ACADEMY — Firebase connection layer
 */

(function () {
  'use strict';

  const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyDbJMBU5f7qnly_G8rNFlnrLUfZkQolCs8',
    authDomain: 'tca-gym-management.firebaseapp.com',
    projectId: 'tca-gym-management',
    storageBucket: 'tca-gym-management.firebasestorage.app',
    messagingSenderId: '686752972470',
    appId: '1:686752972470:web:69df521e3b7b3cd0f63017',
    measurementId: 'G-HC377RVKQJ'
  };

  const SDK_VERSION = '12.2.1';

  window.TCAFirebaseReady = (async function () {
    try {
      const base =
        'https://www.gstatic.com/firebasejs/' + SDK_VERSION;

      const [
        appSdk,
        authSdk,
        firestoreSdk,
        storageSdk
      ] = await Promise.all([
        import(base + '/firebase-app.js'),
        import(base + '/firebase-auth.js'),
        import(base + '/firebase-firestore.js'),
        import(base + '/firebase-storage.js')
      ]);

      let app;

      /*
       * Reuse Firebase if index.html already created it.
       * Otherwise create the Firebase app here.
       */
      if (window.firebaseApp) {
        app = window.firebaseApp;
      } else {
        app = appSdk.initializeApp(FIREBASE_CONFIG);
        window.firebaseApp = app;
      }

      const auth =
        window.firebaseAuth ||
        authSdk.getAuth(app);

      const db =
        window.firebaseDB ||
        firestoreSdk.getFirestore(app);

      const storage =
        window.firebaseStorage ||
        storageSdk.getStorage(app);

      window.firebaseAuth = auth;
      window.firebaseDB = db;
      window.firebaseStorage = storage;

      window.TCAFirebase = {
        app,
        auth,
        db,
        storage,

        sdk: {
          app: appSdk,
          auth: authSdk,
          firestore: firestoreSdk,
          storage: storageSdk
        },

        config: FIREBASE_CONFIG
      };

      console.info(
        '[TCA Firebase] Connected:',
        FIREBASE_CONFIG.projectId
      );

      return window.TCAFirebase;

    } catch (error) {

      console.error(
        '[TCA Firebase] Connection failed:',
        error
      );

      window.TCAFirebase = null;

      return null;
    }
  })();

})();