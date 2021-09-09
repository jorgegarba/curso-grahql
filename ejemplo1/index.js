const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

require('dotenv').config();

const { readFileSync } = require('fs');
const { join } = require('path');

const resolvers = require('./lib/resolvers');
const { mongoConnection } = require('./lib/db');

const app = express();

const PORT = process.env.PORT || 3000;

const typeDefs = readFileSync(
	join(__dirname, 'lib', 'schema.graphql'),
	'utf-8'
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
	'/api',
	graphqlHTTP({
		schema,
		rootValue: resolvers,
		graphiql: true
	})
);

app.listen(PORT, () => {
	console.log('Servidor corriendo correctamente');
	mongoConnection().then(() => {
		console.log('Conectado a mongo mongo');
	});
});
