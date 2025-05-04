import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import User from '../../models/user';
import { signAccessToken, signRefreshToken } from '../../helpers/jwt';

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/test_database`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth API', () => {
  let user;

  beforeEach(async () => {
    user = new User({ email: 'test@example.com', password: 'password123' });
    await user.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /auth/login', () => {
    it('should return 200 and tokens for valid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('refreshToken');
    });

    it('should return 400 for invalid email', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'invalid@example.com', password: 'password123' });

      expect(res.statusCode).toEqual(400);
    });

    it('should return 400 for invalid password', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });

      expect(res.statusCode).toEqual(400);
    });
  });
});
