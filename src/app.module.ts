import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConverterModule } from './converter/converter.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    ConverterModule,
  ],
})
export class AppModule {}
