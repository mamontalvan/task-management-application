import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`], // Puedes especificar la ruta a tu archivo .env si no está en la raíz
      isGlobal: true, // Hace que ConfigModule esté disponible globalmente sin necesidad de importarlo en otros módulos
      validationSchema: configValidationSchema, // Agrega la validación del esquema 
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            autoLoadEntities: true,
            synchronize: true,
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_DATABASE'),
          })
    }),
/*     TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }), */
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
