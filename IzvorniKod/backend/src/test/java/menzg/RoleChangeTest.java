package menzg;
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class RoleChangeTest {
    private WebDriver driver;
    private Map<String, Object> vars;
    JavascriptExecutor js;
    @Before
    public void setUp() {
        driver = new ChromeDriver();
        js = (JavascriptExecutor) driver;
        vars = new HashMap<String, Object>();
    }
    @After
    public void tearDown() {
        driver.quit();
    }
    @Test
    public void roleChange() {
        driver.get("http://localhost:5173/menze");
        driver.manage().window().setSize(new Dimension(809, 816));
        driver.findElement(By.cssSelector(".nav-item:nth-child(2)")).click();
        driver.findElement(By.cssSelector(".nav-item:nth-child(2) > .nav-btn")).click();
        {
            WebElement element = driver.findElement(By.cssSelector(".nav-item:nth-child(3) > .nav-btn"));
            Actions builder = new Actions(driver);
            builder.moveToElement(element).perform();
        }
        {
            WebElement element = driver.findElement(By.tagName("body"));
            Actions builder = new Actions(driver);
            builder.moveToElement(element, 0, 0).perform();
        }
        js.executeScript("window.scrollTo(0,300)");
        driver.findElement(By.cssSelector("tr:nth-child(8) .select-role")).click();
        {
            WebElement dropdown = driver.findElement(By.cssSelector("tr:nth-child(8) .select-role"));
            dropdown.findElement(By.xpath("//option[. = 'Zaposlenik']")).click();
        }
    }
}