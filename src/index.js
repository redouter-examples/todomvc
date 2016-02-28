import express from 'express';
import routes from './server/routes/index';

const app = express();

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server started`);
});