const puppeteer = require('puppeteer-extra'),
	StealthPlugin = require('puppeteer-extra-plugin-stealth'),
	lcl = require('cli-color');
puppeteer.use(StealthPlugin());

function Gmeet() {
	this.browser = null
}

Gmeet.prototype.join = async function (id, email, password, options = {}) {
	//Check if another browser is already open and close it if it is
	if (this.browser !== null) {
		await this.browser.close()
		this.browser = null;
	}

	let page
	let failed = false
	let attempt = 0
	let headless = false
	let verbose = false
	do {
		try {
			// launch browser
			this.browser = await puppeteer.launch({
				headless: headless,
				args: ['--use-fake-ui-for-media-stream']
			});

			// launch page and goto login page
			page = await this.browser.newPage();
			await page.goto("https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin");
			
			// type email and password
			if (verbose) console.log(lcl.yellow("[Browser - Verbose]"), "Inputting username");
			await page.type("input#identifierId", email, {
				delay: 0
			});
			await page.click("div#identifierNext");
			if (verbose) console.log(lcl.yellow("[Browser - Verbose]"), "Clicked the next button");
			await require('timers/promises').setTimeout(5 * 1000);
			if (verbose) console.log(lcl.yellow("[Browser - Verbose]"), "Inputting password");
			await page.type("input.whsOnd.zHQkBf", password, {
				delay: 0
			});
			await page.click("div#passwordNext");
			if (verbose) console.log(lcl.yellow("[Browser - Verbose]"), "Clicked the next button");
			await require('timers/promises').setTimeout(5 * 1000);

			// goto meet
			await page.goto(`https://meet.google.com/${id}`);
			await require('timers/promises').setTimeout(5 * 1000); // this could fail if the page is not loaded in time

			// disable Microphone and Camera
			await page.keyboard.down('Control');
			await page.keyboard.press('KeyE');
			await page.keyboard.up('Control');
			await page.keyboard.down('Control');
			await page.keyboard.press('KeyD');
			await page.keyboard.up('Control');

			// join meet
			await page.click("div.uArJ5e:nth-child(1) > span:nth-child(3)");
			console.log(lcl.blue("[Browser - Info]"), "Successfully joined/Sent join request");

			// await to check if we are in the meet
			await page.waitForSelector(".SGP0hd > div:nth-child(1) > span:nth-child(1) > button:nth-child(1)");
			console.log(lcl.green("[Browser - Success]"), "Successfully joined meet");
			
			// await for when we are kicked / leave the meet
			await page.waitForSelector(".roSPhc");
			await page.close();
			await this.browser.close();
			console.log(lcl.green("[Browser - Success]"), "Successfully closed browser");
			failed = false;
		} catch (err) {
			if (attempt < 5) {
				console.log(lcl.red("[Browser - Error]"), "Something went wrong, trying again... do not close the nodejs process.")
				await page.close()
				await this.browser.close()
				failed = true;
				attempt++
			} else {
				await page.close()
				try {
					await this.browser.close()
				} catch (error) {
					console.log(lcl.red("[Browser - Error]"), ' ' + err);
				}
				console.log(lcl.red("[Browser - Error]"), "Unable to join the meeting. Check if you entered the correct emailID and password. If running in HEADLESS=true mode, try running in HEADLESS=false mode and manually see where the error occurs.")
				break
			}
		}
	} while (failed === true)
}

module.exports = Gmeet