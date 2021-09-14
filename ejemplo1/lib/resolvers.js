// const courses = [
// 	{
// 		title: 'Vue1',
// 		description: 'Curso de Vue1',
// 		teacher: 'Jorgito1',
// 		topic: 'programashon1'
// 	},
// 	{
// 		title: 'Vue2',
// 		description: 'Curso de Vue2',
// 		teacher: 'Jorgito2',
// 		topic: 'programashon2'
// 	},
// 	{
// 		title: 'Vue3',
// 		description: 'Curso de Vue3',
// 		teacher: 'Jorgito3',
// 		topic: 'programashon3'
// 	},
// 	{
// 		title: 'Vue4',
// 		description: 'Curso de Vue4',
// 		teacher: 'Jorgito4',
// 		topic: 'programashon4'
// 	}
// ];

const mutations = require('./mutations');
const queries = require('./queries');
const types = require('./types');
module.exports = {
	Query: queries,
	Mutation: mutations,
	...types   
};
