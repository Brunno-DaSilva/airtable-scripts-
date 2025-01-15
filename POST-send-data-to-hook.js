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
