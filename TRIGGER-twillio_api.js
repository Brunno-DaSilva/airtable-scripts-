/**
 * ================================================================
 *                     Twilio API Integration Script
 * ================================================================
 *
 * This script sends an API request to Twilio's Studio API to initiate
 * a workflow and send a message to a specified phone number.
 * It uses the Twilio REST API and requires authentication via
 * an Account SID and Auth Token, which are passed as environment variables.
 *
 * Assumptions:
 * - You need to provide a phone number (`to_phone`) through the
 *   Airtable configuration (`inputConfig`).
 * - The script uses Twilio's Studio API and requires an active
 *   Twilio account with a verified phone number.
 * - Twilio API credentials (Account SID and Auth Token) are securely
 *   stored in Airtable Secrets.
 *
 * Key Variables:
 * - `ACCOUNT_SID`: Your Twilio Account SID (stored securely).
 * - `AUTH_TOKEN`: Your Twilio Auth Token (stored securely).
 * - `FROM_PHONE`: Your Twilio phone number (stored securely).
 * - `STUDIO_URL`: The URL of the Twilio Studio Flow API endpoint.
 * - `to_phone`: The phone number to send the message to (provided via the `config` object).
 * - `params`: Parameters to be passed into Twilio Studio, which are dynamically
 *   pulled from the Airtable input configuration.
 *
 * Output:
 * - Success message indicating whether the request to Twilio Studio was successful.
 * - Error message if the request fails or if required parameters are missing.
 *
 * Credit:
 * - Twilio Samples
 *
 * ================================================================
 */

const ACCOUNT_SID = await input.secrets.get("TWILIO_ACCOUNT_SID");
const AUTH_TOKEN = await input.secrets.get("TWILIO_AUTH_TOKEN");
const FROM_PHONE = await input.secrets.get("TWILIO_PHONE_NUMBER");
const STUDIO_URL = "<YOUR_TWILIO_STUDIO_API_URL>";

let inputConfig = input.config();
if (!inputConfig.to_phone) {
  output.text("Phone number (to_phone) is required.");
  return;
}

async function sendTwilioRequest() {
  // Prepare headers
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    `Basic ${btoa(ACCOUNT_SID + ":" + AUTH_TOKEN)}`
  );

  const urlencoded = new URLSearchParams();
  urlencoded.append("To", `${inputConfig.to_phone}`);
  urlencoded.append("From", FROM_PHONE);

  const params = {};
  for (const [field, value] of Object.entries(inputConfig)) {
    params[field] = value;
  }
  urlencoded.append("Parameters", JSON.stringify(params));

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "manual",
  };

  try {
    let apiResponse = await fetch(STUDIO_URL, requestOptions);
    if (!apiResponse.ok) {
      throw new Error(`API call failed with status: ${apiResponse.status}`);
    }
    let responseJson = await apiResponse.json();
    output.text("Twilio request sent successfully!");
    output.text(JSON.stringify(responseJson, null, 2));
  } catch (error) {
    output.text("Error: " + error.message);
  }
}

await sendTwilioRequest();
