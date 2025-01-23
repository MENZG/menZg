package menzg;

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.JavascriptExecutor;
import java.util.HashMap;
import java.util.Map;

public class BlockUserTest {
    private WebDriver driver;
    private Map<String, Object> vars;
    JavascriptExecutor js;

    @Before
    public void setUp() {
        driver = new ChromeDriver();
        js = (JavascriptExecutor) driver;
        vars = new HashMap<>();
    }

    @After
    public void tearDown() {
        driver.quit();
    }

    @Test
    public void blockUser() {
        driver.get("http://localhost:5173/menze");
        driver.manage().window().maximize();
        driver.findElement(By.cssSelector(".nav-item:nth-child(2) > .nav-btn")).click();
        js.executeScript("window.scrollTo(0, document.body.scrollHeight / 2)");
        driver.findElement(By.cssSelector("tr:nth-child(8) .block-btn")).click();
    }
}
