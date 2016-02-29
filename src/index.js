import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import routes from './server/routes/index';

const app = express();

app.use(bodyParser.urlencoded({extended: true})); // basic HTML form POST
app.use(methodOverride('_method')); // because HTML, even 5, doesn't support form actions other than GET and POST
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server started`);
});