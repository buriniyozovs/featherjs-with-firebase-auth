// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'
import FirebaseStrategy from './firebase-strategy.js'

export const authentication = (app) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('firebase', new FirebaseStrategy());

  app.set('authentication', {
    entity: 'user',
    service: 'users',
    secret: 'your-secret',
    authStrategies: ['jwt', 'local', 'firebase'],
    jwtOptions: {
      header: { typ: 'access' },
      audience: 'https://yourdomain.com',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d'
    }
  });

  app.use('authentication', authentication)
}
