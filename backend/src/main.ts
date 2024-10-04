import { NestFactory } from '@nestjs/core'; 
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CountryModule } from './country/country.module';

async function bootstrap() {
  const app = await NestFactory.create(CountryModule);

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  const config = new DocumentBuilder()
    .setTitle('Country Info App')
    .setDescription('Find many infos of countries')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
