const { axiosRequest } = require('./axios');
const { limits } = require('./constants');

/**
 * Extracts the call count from the response headers.
 * @param {Object} res - The response object from Axios.
 * @returns {number | Error} The call count or an Error object if the header is invalid.
 */
const getCallCount = (res) => {
	try {
		// Check if the 'x-app-usage' header exists in the response
		if (!res?.headers?.['x-app-usage']) {
			// If the header is missing, return an Error indicating an invalid header
			return new Error('Invalid header');
		}
		// Parse the 'x-app-usage' header to extract the call count
		return JSON.parse(res?.headers?.['x-app-usage'])?.['call_count'];
	} catch (error) {
		// If an error occurs during parsing, return the error object
		return error;
	}
};

/**
 * Calculates the adjusted wait time based on the call count.
 * @param {number} callCounts - The call count percentage.
 * @returns {number} The adjusted wait time in milliseconds.
 */
const getAdjustedWaitTime = (callCounts) => {
	/**
	 * Calculates a dynamic multiplier based on the call count percentage.
	 * The multiplier adjusts the wait time to regulate API usage.
	 * @param {number} callCounts - The call count percentage.
	 * @returns {number} The dynamic multiplier.
	 */
	const calculateMultiplier = (callCounts) => {
		// Determine the multiplier based on the call count percentage
		if (callCounts < 50) {
			return 1; // Use a multiplier of 1 if call count is less than 50%
		} else if (callCounts >= 50 && callCounts < 75) {
			return 3; // Use a multiplier of 5 if call count is between 50% and 75%
		} else {
			return 7; // Use a multiplier of 10 if call count is 75% or higher
		}
	};

	// Explanation: The formula is designed to increase the wait time exponentially as the call count percentage approaches 100%.
	// At 0% call count, the wait time will be at its minimum value (2 seconds in this case).
	// As the call count percentage increases, the wait time increases exponentially, reaching its maximum value (defined by the formula) at 100% call count.
	// This exponential increase ensures that the wait time scales appropriately with the call count percentage to regulate the API usage.

	return (
		(1 / (0.5 * (1 - callCounts / 100))) *
		1000 *
		calculateMultiplier(callCounts)
	);
};

/**
 * Constructs the API URL based on the provided access token.
 * @param {string} accessToken - The access token for Facebook API.
 * @returns {string} The constructed API URL.
 */
const getApiUrl = (accessToken) =>
	`https://graph.facebook.com/v19.0/me?fields=id%2Cname%2Clast_name&access_token=${accessToken}`;

/**
 * Retrieves the appropriate wait time based on the call count percentage.
 * @param {number} callCounts - The call count percentage.
 * @returns {number} The wait time in milliseconds.
 */
const getWaitTime = (callCounts) => {
	// Iterate through the defined limits
	for (const limit of limits) {
		// Check if the call count percentage falls within the current limit
		if (limit.callCounts >= callCounts) {
			// If the call count percentage is within the limit, return the corresponding wait time
			return limit.waitTime;
		}
	}
	return 10 * 60 * 1000; // Default wait time if no matching limit is found
};

/**
 * Implements Strategy 1 for rate limiting.
 * @param {string} accessToken - The access token for Facebook API.
 */
const strategy1 = async (accessToken) => {
	let waitTime;
	// Define an asynchronous function to handle the rate of API calls
	async function handleCallRate() {
		try {
			// Make an API request to retrieve data
			const res = await axiosRequest('get', getApiUrl(accessToken));
			// Extract the call count from the response headers
			const callCounts = getCallCount(res);
			// Determine the wait time based on the call count percentage
			waitTime = getWaitTime(callCounts);

			// Log the retrieved data and relevant information
			console.log(`Data: `, res.data);
			console.log(`Request used (%): ${callCounts} %`);
			console.log(
				`Wait Time (seconds): ${(waitTime / 1000).toFixed(2)} seconds`
			);
<<<<<<< HEAD
		}  catch (error) {
			// if error is because of invalid access token
			if (error?.response?.data?.error?.type == 'OAuthException') {
				console.log("Invalid Token");
				return false;
			} else {
				throw error;
			}
		// Schedule the next API call based on the calculated wait time
		setTimeout(handleCallRate, waitTime);
	}
}
=======
		} catch (error) {
			// Handle any errors that occur during the API request
			console.log(error);
		}
		// Schedule the next API call based on the calculated wait time
		setTimeout(handleCallRate, waitTime);
	}
>>>>>>> 2da955e8ba611072635bbf9baae7c4257ac5c23f

	// Start handling the rate of API calls
	handleCallRate();
};

/**
 * Implements Strategy 2 for rate limiting.
 * @param {string} accessToken - The access token for Facebook API.
 */
const strategy2 = async (accessToken) => {
	let waitTime = 2000; // Default wait time
	// Define an asynchronous function to handle the rate of API calls
	async function handleCallRate() {
		try {
			// Make an API request to retrieve data
			const res = await axiosRequest('get', getApiUrl(accessToken));
			// Extract the call count from the response headers
			const callCounts = getCallCount(res);
			// Calculate the adjusted wait time based on the call count percentage
			waitTime = getAdjustedWaitTime(callCounts);

			// Log the retrieved data and relevant information
			console.log(`Data: `, res.data);
			console.log(`Request used (%): ${callCounts} %`);
			console.log(
				`Wait Time (seconds): ${(waitTime / 1000).toFixed(2)} seconds`
			);
		}  catch (error) {
			// if error is because of invalid access token
			if (error?.response?.data?.error?.type == 'OAuthException') {
				console.log("Invalid Token");
				return false;
			} else {
				throw error;
			}
		// Schedule the next API call based on the calculated wait time
		setTimeout(handleCallRate, waitTime);
	}
}

	// Start handling the rate of API calls
	handleCallRate();
};

module.exports = { strategy1, strategy2 };
