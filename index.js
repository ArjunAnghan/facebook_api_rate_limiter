const readline = require('readline-sync');
const { strategy1, strategy2 } = require('./strategies');
const { getUserInputs } = require('./input');

/**
 * Main function to execute the rate limiting strategies based on user input.
 */
const main = async () => {
    try {
        // Prompt the user for access token and strategy choice
        const { accessToken, strategy } = await getUserInputs();

        // Execute the selected strategy based on user input
        if (strategy === 'strategy1') {
            await strategy1(accessToken);
        } else if (strategy === 'strategy2') {
            await strategy2(accessToken);
        }
    } catch (error) {
        // log error
        console.log('Error: ', error);
    }
};

// Call the main function to start the program execution
main();
