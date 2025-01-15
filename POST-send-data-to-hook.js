/**
 * ================================================================
 *                      Webhook POST Request Script
 * ================================================================
 *
 * This script sends a POST request to a specified webhook URL.
 * It sends user information (name, email, phone number) as a JSON payload.
 * The response from the webhook is logged and can be used for further processing.
 *
 * Assumptions:
 * - You need to provide user details through the configuration (`config.name`, `config.email`, `config.phoneNumber`).
 * - The webhook URL (`HOOK_URL`) should be provided for the POST request.
 * - The script handles any errors that might occur during the fetch request.
 *
 * Key Variables:
 * - `HOOK_URL`: The URL of the webhook endpoint where the POST request is sent.
 * - `options`: The configuration for the `fetch` request, including the HTTP method (`POST`), headers, and body (the user data in JSON format).
 * - `config`: The configuration object that provides the user's name, email, and phone number.
 *
 * Output:
 * - The script logs the response data (if successful) to the console.
 * - If an error occurs (e.g., invalid URL, network failure), the error is logged to the console.
 *
 * ================================================================
 */

let config = input.config();
const HOOK_URL = ``;
const options = {
  method: "POST",
  headers: {
    "Content-Type": "applictaion/json",
  },
  body: JSON.stringify({
    name: config.name,
    email: config.email,
    phoneNumber: config.phoneNumber,
  }),
};

async function run() {
  try {
    const response = await fetch(HOOK_URL, options);

    if (!response.ok) {
      console.log(`Failed to fetch. Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

await run();
