const { ObjectId } = require('mongodb');
const connectDB = require('./db');

module.exports = {
	Course: {
		people: async ({ people }) => {
			let db;
			let ids;
			let peopleData;
			try {
				db = await connectDB.mongoConnection();
				ids = people ? people.map((id) => ObjectId(id)) : [];
				peopleData =
					ids.length > 0
						? await db
								.collection('students')
								.find({
									_id: { $in: ids }
								})
								.toArray()
						: [];
			} catch (error) {
				console.log('error');
				console.log(error);
			}
			return peopleData;
		}
	}
};
