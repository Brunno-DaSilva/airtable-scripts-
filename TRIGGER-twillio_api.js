


const ACCOUNT_SID = await input.secrets.get('TWILIO_ACCOUNT_SID');
const AUTH_TOKEN = await input.secrets.get('TWILIO_AUTH_TOKEN');
const FROM_PHONE = await input.secrets.get('TWILIO_PHONE_NUMBER');
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
  myHeaders.append("Authorization", `Basic ${btoa(ACCOUNT_SID + ":" + AUTH_TOKEN)}`);
  
  
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
    output.text('Twilio request sent successfully!');
    output.text(JSON.stringify(responseJson, null, 2)); 
  } catch (error) {
    output.text('Error: ' + error.message);
  }
}


await sendTwilioRequest();
