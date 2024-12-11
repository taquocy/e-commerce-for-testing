import express from 'express';
import googleAuthController from './controllers/googleAuthController';

const router = express.Router();
router.post('/google-login', googleAuthController.GoogleLogin);

export default router;
