document.addEventListener("DOMContentLoaded", () => {
  try {
    const socket = io("https://ws-playground-1515151.herokuapp.com/lia");

    socket.on("lia:connected-count", (count) => console.log(`users: ${count}`));
    socket.on("lia:command", ({ Body: command = "" }) => {
      const normalized = `${command}`.toLocaleLowerCase();

      if (normalized.includes("hair")) {
        const currentHeight = window
          .getComputedStyle(root)
          .getPropertyValue("--hair-height")
          .trim();

        const asPx = parseInt(currentHeight);

        let changeAmount = Number(normalized.match(/\d+/)[0] || 0);

        if (normalized.includes("shave") || normalized.includes("shrink")) {
          changeAmount = changeAmount * -1;
        }

        document.documentElement.style.setProperty(
          "--hair-height",
          `${asPx + changeAmount}px`
        );
      }
    });
  } catch (error) {
    console.error(error);
    alert("Oh no! Something broke with the super cool text message feature :/");
  }

  const root = document.documentElement;
  const nose = document.querySelector(".nose");

  nose.addEventListener("click", () => {
    const currentHeight = window
      .getComputedStyle(root)
      .getPropertyValue("--hair-height")
      .trim();

    document.documentElement.style.setProperty(
      "--hair-height",
      `${parseInt(currentHeight) + 5}px`
    );
  });

  /* 
  
  {"ToCountry":"US","ToState":"WA","SmsMessageSid":"SM137435cbc66a214f51dd0f497c83922b","NumMedia":"0","ToCity":"","FromZip":"80918","SmsSid":"SM137435cbc66a214f51dd0f497c83922b","FromState":"CO","SmsStatus":"received","FromCity":"COLORADO SPRINGS","Body":"Hello!","FromCountry":"US","To":"+12065903311","ToZip":"","NumSegments":"1","MessageSid":"SM137435cbc66a214f51dd0f497c83922b","AccountSid":"ACb09fb625ff2847ab6f2ac315717cefbc","From":"+17194406097","ApiVersion":"2010-04-01"}
  
  */
});
