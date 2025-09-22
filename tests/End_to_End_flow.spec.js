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