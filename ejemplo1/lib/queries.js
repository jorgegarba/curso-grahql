const { ObjectId } = require('mongodb');
const connectDB = require('./db');
module.exports = {
	getCourses: async () => {
		let courses = [];
		try {
			let client = await connectDB.mongoConnection();
			courses = await client.collection('cursos').find().toArray();
		} catch (error) {
			return 'Error' + error.toString();
		}
		return courses;
	},
	getCourseById: async (param1, args) => {
		let course;
		try {
			let client = await connectDB.mongoConnection();
			course = await client
				.collection('cursos')
				.findOne({ _id: ObjectId(args.id) });
		} catch (error) {
			return 'Error' + error.toString();
		}
		return course;
	},
	getStudents: async () => {
		let students = [];
		try {
			let db = await connectDB.mongoConnection();
			students = await db.collection('students').find().toArray();
		} catch (error) {
			return 'Error' + error.toString();
		}
		return students;
	},
	getStudentById: async (root, { id }) => {
		let student;
		try {
			let db = await connectDB.mongoConnection();
			student = await db.collection('students').findOne({ _id: ObjectId(id) });
		} catch (error) {
			return 'Error' + error.toString();
		}
		return student;
	}
};
