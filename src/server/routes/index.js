import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	res.write('Hello world!');
	res.status(200).end();
});

export default router;