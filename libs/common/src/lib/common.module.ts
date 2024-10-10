import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { PolicyModule } from 'src/modules/policy/policy.module';
// import { AuthModule } from 'src/modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import configs from 'src/configs';
// import { ApiKeyModule } from 'src/modules/api-key/api-key.module';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { DATABASE_CONNECTION_NAME } from './database/constants/database.constant';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/services/database.service';
import { MessageModule } from './message/message.module';
import { HelperModule } from './helper/helper.module';
import { RequestModule } from './request/request.module';
import { PaginationModule } from './pagination/pagination.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: false,
    }),
    MongooseModule.forRootAsync({
      connectionName: DATABASE_CONNECTION_NAME,
      imports: [DatabaseModule],
      inject: [DatabaseService],
      useFactory: (databaseService: DatabaseService) => databaseService.createOptions(),
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: (await redisStore({
          socket: {
            host: configService.get<string>('redis.host'),
            port: configService.get<number>('redis.port'),
            tls: configService.get<any>('redis.tls'),
          },
          username: configService.get<string>('redis.username'),
          password: configService.get<string>('redis.password'),
          ttl: configService.get<number>('redis.cached.ttl'),
        })) as unknown as CacheStore,
      }),
    }),
    MessageModule.forRoot(),
    HelperModule.forRoot(),
    RequestModule.forRoot(),
    // PolicyModule.forRoot(),
    // AuthModule.forRoot(),
    // ApiKeyModule.forRoot(),
    PaginationModule.forRoot(),
    FileModule.forRoot(),
  ],
  providers: [],
})
export class CommonModule {}
