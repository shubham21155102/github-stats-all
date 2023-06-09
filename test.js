const l = require("./gitfetch");
(async () => {
  const data = await l("shubham21155102");
  console.log(data.languages);
  console.log(data.commits);
    console.log(data.prs);
  console.log(data.contributions);
})();
