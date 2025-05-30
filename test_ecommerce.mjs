import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

const BASE_URL = 'http://localhost:3000';

describe('E-commerce Test Cases', function () {
  let driver;
  this.timeout(30000);

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('TC01: Đăng nhập thành công', async () => {
    await driver.get(`${BASE_URL}/signin`);
    await driver.findElement(By.name('email')).sendKeys('superadmin@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('admin123');
    await driver.findElement(By.css('[data-testid="signin-btn"]')).click();
    await driver.wait(until.urlIs(`${BASE_URL}/`), 10000);
    const url = await driver.getCurrentUrl();
    expect(url).to.not.include('login');
  });

  it('TC02: Email sai định dạng', async () => {
    await driver.get(`${BASE_URL}/login`);
    await driver.findElement(By.name('email')).sendKeys('superadmingmail.com');
    await driver.findElement(By.name('password')).sendKeys('admin123');
    await driver.findElement(By.css('[data-testid="signin-btn"]')).click();
    const error = await driver.findElement(By.className('error')).getText();
    expect(error).to.satisfy(msg => msg.includes('@') || msg.toLowerCase().includes('không hợp lệ'));
  });

  it('TC03: Mật khẩu trống', async () => {
    await driver.get(`${BASE_URL}/login`);
    await driver.findElement(By.name('email')).sendKeys('superadmin@gmail.com');
    await driver.findElement(By.name('password')).clear();
    await driver.findElement(By.css('[data-testid="signin-btn"]')).click();
    const error = await driver.findElement(By.className('error')).getText();
    expect(error.toLowerCase()).to.include('mật khẩu');
  });

  it('TC04: Đăng ký thành công', async () => {
    await driver.get(`${BASE_URL}/signup`);
    await driver.findElement(By.name('email')).sendKeys('user3@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('user123');
    await driver.findElement(By.name('passwordConfirm')).sendKeys('user123');
    const signupBtn = await driver.findElement(By.css('button[type="submit"]'));
    await signupBtn.click();
    await driver.wait(until.urlContains('login'), 10000);
    const url = await driver.getCurrentUrl();
    expect(url).to.satisfy(u => u.includes('login') || u.includes('signin'));
  });

  it('TC05: Mật khẩu không khớp', async () => {
    await driver.get(`${BASE_URL}/signup`);
    await driver.findElement(By.name('email')).sendKeys('user2@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('pass123');
    await driver.findElement(By.name('passwordConfirm')).sendKeys('pass456');
    const signupBtn = await driver.findElement(By.css('button[type="submit"]'));
    await signupBtn.click();
    const error = await driver.findElement(By.className('error')).getText();
    expect(error.toLowerCase()).to.include('không khớp');
  });

  it('TC06: Email trống', async () => {
    await driver.get(`${BASE_URL}/signup`);
    await driver.findElement(By.name('email')).clear();
    await driver.findElement(By.name('password')).sendKeys('pass123');
    await driver.findElement(By.name('passwordConfirm')).sendKeys('pass123');
    const signupBtn = await driver.findElement(By.css('button[type="submit"]'));
    await signupBtn.click();
    const error = await driver.findElement(By.className('error')).getText();
    expect(error.toLowerCase()).to.include('email');
  });

  it('TC07: Quên mật khẩu không nhập email', async () => {
    await driver.get(`${BASE_URL}/forgot-password`);
    await driver.findElement(By.name('email')).clear();
    await driver.findElement(By.xpath("//button[contains(text(),'Send Instructions') or contains(text(),'Reset')]")).click();
    const error = await driver.findElement(By.className('error')).getText();
    expect(error.toLowerCase()).to.satisfy(msg => msg.includes('email') || msg.includes('vui lòng'));
  });

  it('TC08: Thêm sản phẩm vào giỏ', async () => {
    await driver.get(`${BASE_URL}/`);
    const addBtn = await driver.wait(
      until.elementLocated(By.css('[data-testid="add-to-basket-btn"]')),
      10000
    );
    await addBtn.click();
    const removeBtn = await driver.wait(
      until.elementLocated(By.css('[data-testid="remove-from-basket-btn"]')),
      10000
    );
    expect(await removeBtn.isDisplayed()).to.be.true;
  });

  it('TC09: Thêm sản phẩm vào cart', async () => {
    await driver.get(`${BASE_URL}/`);
    const addBtn = await driver.findElement(By.xpath("//button[contains(text(),'Add to Cart')]"));
    await addBtn.click();
    const removeBtn = await driver.findElement(By.xpath("//button[contains(text(),'Remove from Cart')]"));
    expect(await removeBtn.isDisplayed()).to.be.true;
  });

  
  it('TC10: Xoá sản phẩm khỏi giỏ', async () => {
    await driver.get(`${BASE_URL}/basket`);
    const removeBtn = await driver.findElement(By.css('[data-testid="remove-from-basket-btn"]'));
    await removeBtn.click();
    const addBtn = await driver.findElement(By.css('[data-testid="add-to-basket-btn"]'));
    expect(await addBtn.isDisplayed()).to.be.true;
  });

});