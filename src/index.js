import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import routes from './server/routes/index2';

// react stuff
import reactRoutes from './universal/react/routes/index';
import { server } from 'redouter';
import rootReducer from './universal/redux/root';

const app = express();

app.use('/static', express.static('./src/client'));
app.use(bodyParser.urlencoded({extended: true})); // basic HTML form POST
app.use(methodOverride('_method')); // because HTML, even 5, doesn't support form actions other than GET and POST

// insert redouter middleware
app.use(server.redouter({
	rootReducer,
	routes: reactRoutes,
	templater: (html, store) => `
<!doctype html>
${html}
<script>window.__INITIAL_STATE__ = '${JSON.stringify(store.getState())}'</script>
<script src="/static/bundlex.js"></script>
`
}));
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server started`);
});