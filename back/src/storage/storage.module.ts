import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersService } from './service/user.service';
import {Form} from "./entity/form.entity";
import {FormService} from "./service/form.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'HederaHackDb',
      entities: [User, Form],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      User,
      Form
    ])
  ],
  exports: [
    UsersService,
    FormService
  ],
  providers: [
    UsersService,
    FormService
  ]
})
export class StorageModule {}
