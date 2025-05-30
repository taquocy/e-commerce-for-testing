import { Router } from 'express';

// helpers
import { verifyAccessToken } from '../helpers/jwt';

// routes
import auth from './auth';
import product from './product';
import order from './order';

const router = Router();

router.get('/', (req, res) => {
  res.send('API is runningAPI is runningAPI is runningAPI is runningAPI is running');
});

router.use('/auth', auth);
router.use('/product', product);
router.use('/order', verifyAccessToken, order);

export default router;
