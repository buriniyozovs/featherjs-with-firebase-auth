import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { AuthenticationBaseStrategy } = require('@feathersjs/authentication');
import admin from './firebase.js'

class FirebaseStrategy extends AuthenticationBaseStrategy {
  async authenticate(authentication) {
    const { accessToken } = authentication;

    try {
      const decodedToken = await admin.auth().verifyIdToken(accessToken);
      const { uid, email } = decodedToken;

      // Find or create a user in your database
      const users = await this.app.service('users').find({ query: { firebaseUid: uid } });

      let user;
      if (users.total === 0) {
        user = await this.app.service('users').create({
          email,
          firebaseUid: uid
        });
      } else {
        user = users.data[0];
      }
      
      console.log("Authenticated");
      
      // Return the user and the authentication payload
      return {
        authentication: { strategy: 'firebase' },
        user
      };
    } catch (error) {
      throw new Error('Invalid Firebase token');
    }
  }
}

export default FirebaseStrategy;