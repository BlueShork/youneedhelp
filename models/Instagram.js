const puppeteer = require('puppeteer');



class Instagram{

    static send(instatag, message_been_send, callback){

        console.log("Starts");

      
const puppeteer = require('puppeteer');
async function main() {
const browser = await puppeteer.launch({
headless: false,
args: ['--no-sandbox']
});
  const page = await browser.newPage();
  await page.goto('https://instagram.com');


  // Identifiants 
  const pseudo = 'server.stalk.one@gmail.com';
  const password = 'motdepasse123456';
  
  // Client informations

  const client = instatag;
  const message = message_been_send;



  const CookieValidation = await page.$('.bIiDR');
  await CookieValidation.click();

  await page.waitFor(2000);


  const Identifiant = await page.$('.pexuQ');
  await Identifiant.type(pseudo);


  await page.waitFor(1000);

  const passwordInput = await page.$('input[type="password"]');
  await passwordInput.type(password);

  await page.waitFor(1000);

  const Submit = await page.$('.Igw0E');
  await Submit.click();

  await page.waitFor(4000);

  const RegisterKey = await page.$('.y3zKF');
  await RegisterKey.click();

  await page.waitFor(3000);

  const Notification = await page.$('.HoLwm');
  await Notification.click();

  await page.waitFor(2000);

  const SearchInput = await page.$('input[type="text"]');
  await SearchInput.type(client);

  await page.waitFor(1000);

  const hrefs = await page.$$eval("a.-qQT3", (list) => list.map((elm) => elm.href));
  console.log(hrefs[0]);
  
  await page.goto(hrefs[0]);

  await page.waitFor(1000);

  const ContactButton = await page.$('._8A5w5');

  await ContactButton.click();

  await page.waitFor(4000);

  const MessageInput = await page.$('.eGOV_');
  await MessageInput.type(message);


  await page.waitFor(2000);

  // Press enter button

  await page.keyboard.press('Enter');

  console.log("FINISH");
  callback("Le serveur à bien envoyer le message");

  await browser.close();
}

// Start the script
main();



    }



}







module.exports = Instagram;