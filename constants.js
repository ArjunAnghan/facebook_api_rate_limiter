// Array of questions to prompt the user for input
const questions = [
	{
		type: 'input',
		name: 'accessToken',
		message: 'Input access token: ',
	},
	{
		type: 'list',
		name: 'strategy',
		message: 'Which strategy do you want to use?',
		choices: ['strategy1', 'strategy2'],
	},
];

// Array of rate limit configurations (for strategy 1)
const limits = [
	{
		callCounts: 50,
		waitTime: 2 * 1000, // wait time is in milliseconds
	},
	{
		callCounts: 60,
		waitTime: 10 * 1000,
	},
	{
		callCounts: 70,
		waitTime: 60 * 1000,
	},
	{
		callCounts: 90,
		waitTime: 180 * 1000,
	},
	{
		callCounts: 100,
		waitTime: 300 * 1000,
	},
];

module.exports = { questions, limits };
