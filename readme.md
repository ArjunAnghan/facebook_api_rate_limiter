# Facebook API Rate Limiter

This project implements rate limiting strategies for the Facebook API to manage API usage and prevent exceeding rate limits set by Facebook. Two strategies are employed to regulate the frequency of API calls based on the current usage percentage provided in the API response headers.

## Overview

This project aims to mitigate the risk of exceeding rate limits by dynamically adjusting the frequency of API calls based on the current api usage percentage.

## Strategies

### Strategy 1: Slab-based Rate Limiting

In this strategy, API usage percentage is monitored, and predefined slabs are established. As the usage percentage increases, the frequency of API calls decreases according to the defined slabs. This strategy provides a straightforward approach to regulating API usage.

### Strategy 2: Dynamic Rate Limiting

This strategy dynamically adjusts the wait time between API calls based on the current usage percentage. A formula is used to calculate the adjusted wait time, which increases exponentially as the usage percentage approaches 100%. This ensures that the wait time scales appropriately with the usage percentage to regulate API usage effectively.

## Logic Behind the Strategies

### Strategy 1

The logic behind Strategy 1 is to define predetermined slabs of API usage percentage. As the usage percentage increases, the corresponding wait time between API calls increases accordingly. This approach aims to maintain API usage within acceptable limits by slowing down the frequency of API calls as the usage percentage rises.

### Strategy 2

The logic behind Strategy 2 is to dynamically adjust the wait time between API calls based on the current usage percentage. The formula used for calculation ensures that the wait time increases exponentially as the usage percentage approaches 100%. This exponential increase ensures that the wait time scales appropriately with the usage percentage, effectively regulating API usage.

## Updating Constants

To update the configuration for rate limiting, modify the `constants.js` file in the project directory. This file contains the following configurations:

- `limits`: Specifies the rate limit configurations, including the call counts and corresponding wait times for each slab or threshold.

## Usage

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Run the application using `node index.js`.
4. Follow the prompts to input the access token and select the desired strategy.

## Author
Arjun Anghan