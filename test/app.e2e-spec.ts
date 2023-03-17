import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // setTimeout, doesn't allow exceeding the rate limit per second for your plan, BASIC, by the API provider
    await new Promise((resolve) => setTimeout(resolve, 2000));

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/currency/list (GET)', async () => {
    const { body } = await request(app.getHttpServer()).get('/currency/list');

    expect(body).toBeInstanceOf(Object);
    return body;
  });

  it('/currency/convert (POST)', async () => {
    const { body } = await request(app.getHttpServer()).post('/currency/convert').send({ amount: 10, from: 'USD', to: 'EUR' });

    expect(body).toBeInstanceOf(Object);
    expect(body.status).toBeDefined();
    expect(body.rates).toBeInstanceOf(Object);
    return body;
  });

  afterAll(async () => {
    await app.close();
  });
});
