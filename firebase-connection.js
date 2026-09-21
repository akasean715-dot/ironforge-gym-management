/*
 * TRIBAL COMBAT ACADEMY — Firebase connection layer
 *
 * This file is intentionally isolated from script.js.
 * It only connects Firebase. It does NOT replace localStorage,
 * modify the UI, render charts, or change existing application logic.
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

  // Expose a safe promise so a future Firebase migration can use it
  // without touching the existing application startup.
  window.TCAFirebaseReady = (async function () {
    try {
      const base = 'https://www.gstatic.com/firebasejs/' + SDK_VERSION;

      const [appSdk, authSdk, firestoreSdk, storageSdk] = await Promise.all([
        import(base + '/firebase-app.js'),
        import(base + '/firebase-auth.js'),
        import(base + '/firebase-firestore.js'),
        import(base + '/firebase-storage.js')
      ]);

      const app = appSdk.initializeApp(FIREBASE_CONFIG);
      const auth = authSdk.getAuth(app);
      const db = firestoreSdk.getFirestore(app);
      const storage = storageSdk.getStorage(app);

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

      console.info('[TCA Firebase] Connected:', FIREBASE_CONFIG.projectId);
      return window.TCAFirebase;
    } catch (error) {
      // Firebase must never be allowed to break the gym dashboard.
      console.warn('[TCA Firebase] Connection unavailable. Dashboard continues normally.', error);
      window.TCAFirebase = null;
      return null;
    }
  })();
})();
