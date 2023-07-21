import fetch from "node-fetch";
import cron from "node-cron";

const serverUrl = "http://localhost:3001/";

async function getMachines() {
  try {
    const response = await fetch(serverUrl + "machines");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

cron.schedule("*/5 * * * * *", async () => {
  console.log("HEllo");
  // const result = await getRequest();
  // if (result) {
  //   postRequest(result);
  // }
});
