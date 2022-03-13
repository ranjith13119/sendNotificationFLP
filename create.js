const { publishSupplyWarningNotification } = require("./DomainNotifications");
require("@sap/xsenv").loadEnv();

(async () => {
  try {
    await publishSupplyWarningNotification({
      reqId: "45649",
      count: 1,
      recipients: ["ranjith13119@gmail.com"],
    });
    console.log("Success");
  } catch (e) {
    if (e.response) {
      console.error(
        `${e.response.statusText} (${e.response.status}): ${JSON.stringify(
          e.response.data.error.message
        )}.`
      );
    } else {
      console.error(e);
    }
  }
})();
