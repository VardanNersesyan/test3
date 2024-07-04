import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config';
import { Logger } from '@nestjs/common';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

const logger = new Logger('Bootstrap');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(appConfig.port);
  logger.log(`Server running on ${appConfig.port} port`);
}
bootstrap();
