const inquirer = require('inquirer');
const { questions } = require('./constants');

/**
 * Asynchronously prompts the user with predefined questions and returns the user's answers.
 * @returns {Promise} A promise that resolves with an object containing the user's input.
 */
const getUserInputs = async () => {
    const answers = await inquirer.prompt(questions);
    return answers;
};

module.exports = { getUserInputs };
