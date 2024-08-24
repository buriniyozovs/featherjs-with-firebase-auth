import admin from 'firebase-admin'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('../path-to-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;