
import { test, expect } from '@playwright/test';


test.only('has title', async ({ page }) => {

    const productName='ADIDAS ORIGINAL';
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('#userEmail').fill("munnirunnisa@outlook.com");
    await page.locator('#userPassword').fill("Jaharas@440");
    
    //const homepage=await page.locator('.btn.btn-custom').nth(0).textContent();
    //console.log(homepage);
    //page.waitForLoadState();
    //expect(homepage).toContain('HOME')
    //const firstitem=await page.locator('.card-body b').first().textContent();  -- locating the first item
    //console.log(firstitem); 
    await page.locator('#login').click(),
    await page.waitForLoadState("networkidle");
    //const homepage=await page.locator('.btn.btn-custom').nth(0).textContent();
    //console.log(homepage);
    //page.waitForLoadState();
    //expect(homepage).toContain('HOME')
    const allElements=await page.locator('.card-body').allTextContents();
    console.log(allElements);
    for (let i=0;i<=allElements.length-1;i++){

        if(await page.locator('.card-body').nth(i).locator("b").textContent()===productName){

           await  page.locator('.card-body').nth(i).locator("text= Add To Cart").click();
           break;
        }
    }

    const addCartMsg=await page.locator("//div[text()=' Product Added To Cart ']").textContent();
    expect(addCartMsg).toMatch(' Product Added To Cart ');
    await page.locator(':nth-match(:text("Cart"), 1)').click();
    const cartItem=await page.locator(".cartSection h3").textContent();
    console.log(cartItem);
    if(cartItem===productName){
        console.log("verified and its the same item added in the previous page");
    }
    await page.pause();
    await page.locator('button:has-text("Checkout")').click();
    await page.locator('input.text-validated[type="text"]').first().waitFor();
    await page.locator('input.text-validated[type="text"]').nth(0).fill("5671236587452356");
    const emailverification=await page.locator('input.text-validated[type="text"]').nth(1).inputValue();
    console.log(emailverification);
     expect(emailverification).toContain("munnirunnisa");

   
    
});



test('radiobutton test', async({page})=> {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill("munnirunnisa@outlook.com");
    await page.locator('#password').fill("Jaharas@440");
    const dropdown=page.locator('select.form-control');
    await dropdown.selectOption('Consultant');
    await page.locator("//span[text()=' User']").click();
    console.log(await page.locator("//span[text()=' User']").isChecked());
    await expect(page.locator("//span[text()=' User']")).toBeChecked();  //we dont have any assertion for unchecked
    await page.locator("#okayBtn").click();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await expect(page.locator('.blinkingText')).toHaveAttribute("class","blinkingText");
    await page.pause();
}
);

test("child window" , async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const context=page.context();
    const [newpage]=await Promise.all([
    context.waitForEvent('page'),
    page.locator('.blinkingText').click()]);
    await page.waitForLoadState('load');
    const verifypagele=await newpage.locator(".inner-box h1").textContent();
    console.log(verifypagele);
    const text=await newpage.locator('.red').textContent();
    console.log(text);
    const arraytext=  text.split("@");
    const domain= arraytext[1].split(" ")[0]
    console.log(domain);
    




});




