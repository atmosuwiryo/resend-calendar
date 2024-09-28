import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Calendar API')
  .setDescription('Backend for create calendar')
  .setVersion(`1.0.0 - ${process.env.NODE_ENV}`)
  .setExternalDoc('Postman Collection', '/docs-json')
  .build();
