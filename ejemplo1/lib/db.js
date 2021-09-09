const { DB_USER, DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD } = process.env;
// const mongoURL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
const mongoURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const { MongoClient } = require('mongodb');

let connection;

const mongoConnection = async () => {
  if(connection) return connection;
	const client = new MongoClient(mongoURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	try {
		await client.connect();
    connection = client.db("codigo");
	} catch (error) {
		console.log('Error connecting mongo db');
    process.exit(1);
	}
  return connection;
};

module.exports = {
	mongoConnection
};
