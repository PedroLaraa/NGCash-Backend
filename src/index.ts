import express, { NextFunction, Request, Response } from 'express'

import { AppDataSource } from './data-source'

var cors = require('cors');

import routes from './routes'

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())

	app.use((req: Request, res: Response, next: NextFunction) => {
		res.header('Access-Control-Allow-Headers', '*');
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
		res.header("Access-Control-Allow-Headers", "*");
		app.use(cors());
		next();
	});

	app.use(routes)

	// app.use(errorMiddleware)
    console.log('Server rodando e db conectado!!!', process.env.PORT)
	return app.listen(process.env.PORT);

})
