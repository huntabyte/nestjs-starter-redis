import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as createRedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';

async function bootstrap() {
  const { PORT, SESSION_SECRET } = process.env;
  const app = await NestFactory.create(AppModule);

  const redisClient = createClient({ legacyMode: true });
  const RedisStore = createRedisStore(session);
  redisClient.connect().catch(console.error);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 86400000, // 1 day expiration
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
