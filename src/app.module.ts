import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserEntity } from './user/repositories/user.entity';
import Joi from 'joi';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['environments/.env.dev'], /** 
            on peu en charger plusieurs
            dans le cas ou la même variable existerais plusieurs fois
            c'est le premier fichier qui gagne
            */
      isGlobal: true, // permet l'accés global au variables du .env
      cache: true, // reduit les accées au fichier .env; amèliore les perfs
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('developement'),
        DB_HOST: Joi.string().pattern(new RegExp(/^(?:(?:25[0-5]|2[0-4]\d|1?\d{1,2})(?:\.(?!$)|$)){4}$/))
          .required(),
        DB_PORT: Joi.number().default(3306)
          .min(4)
        ,
        DB_NAME: Joi.string()
          .alphanum()
          .min(1)
          .required(),
        DB_USERNAME: Joi.string()
          .alphanum()
          .min(1)
          .required(),

        DB_PASSWORD: Joi.string()
          .alphanum()
          .min(1)
          .required(),


      })
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT != null ? +process.env.DB_PORT : 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8mb4',
        synchronize: process.env.NODE_ENV === 'development' ? true : false,
        debug: false,
        entities: [
          UserEntity,
        ],
        migrations: ['../typeorm_migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migration'
        },
        migrationsTableName: "migrations_history",
      }),
    }),
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
