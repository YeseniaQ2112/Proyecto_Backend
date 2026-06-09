import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TallerModule } from './taller/taller.module';
import { AgenteModule } from './agente/agente.module';
import { Taller } from './taller/taller.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'proyecto_cliente',
      entities: [Taller],
      synchronize: true,
    }),
    TallerModule,
    AgenteModule,
  ],
})
export class AppModule {}
