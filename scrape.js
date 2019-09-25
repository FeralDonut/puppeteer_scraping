const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://books.toscrape.com/');
  await page.waitFor(1000);
  // await page.click('#default > div.container-fluid.page > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');

  const result = await page.evaluate(() => {
    let result = new Array();
    let items = document.querySelectorAll('.product_pod');
    
    for (let item of items) {
      let title = item.childNodes[5].innerText;
      let price = item.childNodes[7].children[0].innerText;
      result.push({ title, price});
    }

    return result
  });

  browser.close();
  return result;
};

scrape().then((value) => {
  console.log(value);
});