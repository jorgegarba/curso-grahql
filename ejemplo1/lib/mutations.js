const { ObjectId } = require('mongodb');
const connectDB = require('./db');

module.exports = {
	createCourse: async (root, { input }) => {
		let defaults = {
			teacher: 'Teacher default',
			topic: 'Topic default'
		};
		let db;
		let course;
		try {
			db = await connectDB.mongoConnection();
			course = await db
				.collection('cursos')
				.insertOne({ ...defaults, ...input });
		} catch (error) {
			console.log(error);
		}
		return { ...defaults, ...input, _id: course.insertedId };
	},
	editCourse: async (root, { id, input }) => {
		let db;
		let course;
		try {
			db = await connectDB.mongoConnection();
			await db
				.collection('cursos')
				.updateOne({ _id: ObjectId(id) }, { $set: input });
			course = await db.collection('cursos').findOne({ _id: ObjectId(id) });
		} catch (error) {
			console.log(error);
			return 'error' + error.toString();
		}
		return course;
	},
	createStudent: async (root, { input }) => {
		let db;
		let student;
		try {
			db = await connectDB.mongoConnection();
			student = await db.collection('students').insertOne(input);
		} catch (error) {
			console.log(error);
		}
		return { ...input, _id: student.insertedId };
	},
	editStudent: async (root, { id, input }) => {
		let db;
		let student;
		try {
			db = await connectDB.mongoConnection();
			await db
				.collection('students')
				.updateOne({ _id: ObjectId(id) }, { $set: input });
			student = await db.collection('students').findOne({ _id: ObjectId(id) });
		} catch (error) {
			console.log(error);
			return 'error' + error.toString();
		}
		return student;
	},
	addStudentToCourse: async (root, { idCourse, idStudent }) => {
		let db;
		let course;
		let person;
		try {
			db = await connectDB.mongoConnection();
			person = await db
				.collection('students')
				.findOne({ _id: ObjectId(idStudent) });
			course = await db
				.collection('cursos')
				.findOne({ _id: ObjectId(idCourse) });
			if (!person || !course)
				throw new Error('El estudiante o el curso no existen');

			await db.collection('cursos').updateOne(
				{
					_id: ObjectId(idCourse)
				},
				{
					$addToSet: {
						people: ObjectId(idStudent)
					}
				}
			);
		} catch (error) {
			console.log(error);
			return 'error' + error.toString();
		}
		console.log(course);
		console.log(person);
		let finalPeople = [idStudent];
		if (course.people) {
			finalPeople = [...course.people.map((s) => ObjectId(s._id)), idStudent];
		}
		return {
			...course,
			people: finalPeople
		};
	}
};
