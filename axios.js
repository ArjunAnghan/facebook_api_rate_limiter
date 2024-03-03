const axios = require('axios');

/**
 * Function to make an Axios request.
 * @param {string} method - The HTTP method for the request (e.g., 'get', 'post').
 * @param {string} url - The URL for the request.
 * @param {*} [data=null] - The data to be sent with the request (optional).
 * @param {Object} [headers={}] - Additional headers for the request (optional).
 * @returns {Promise} A promise that resolves with the response data or rejects with an error.
 */
async function axiosRequest(method, url, data = null, headers = {}) {
	try {
		const response = await axios({
			method: method,
			url: url,
			data: data,
			headers: headers,
		});

		return response;
	} catch (error) {
		throw error;
	}
}

module.exports = { axiosRequest };
