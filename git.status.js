const puppeteer = require("puppeteer");
// const username = "shubham21155102";
async function fetchData(username) {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();

  await page.goto(`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true&date_format=j%20M%5B%20Y%5D`);

  const contributions = await page.evaluate(() => {
    const contributionElements = document.querySelector("svg > g > g:nth-child(3) > g:nth-child(1) > text");
    const val = contributionElements.textContent.trim();
    return val;
  });


  await page.goto(`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&locale=en`);
  const commits = await page.evaluate(() => {
    const commitElements = document.querySelector("text[data-testid='commits']");
    return commitElements.textContent.trim();
  });
  const prs=await page.evaluate(()=>{
    const commitElements=document.querySelector("text[data-testid='prs']");
    return commitElements.textContent.trim();
});
  await page.goto(`https://github-readme-stats.vercel.app/api/top-langs?username=${username}&show_icons=true&locale=en&layout=compact`);
  const languages = await page.evaluate(() => {
    const languagesElements = document.querySelectorAll('[data-testid="lang-name"]');
    const langs = Array.from(languagesElements).map(ll => ll.textContent.trim());
    return langs;
  });

  await browser.close();

  return {
    languages,
    commits,
    prs,
    contributions
  };
}

module.exports = fetchData;
