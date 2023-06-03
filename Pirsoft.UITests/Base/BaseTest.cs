using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Playwright;
using NUnit.Framework;

namespace Pirsoft.UITests.Base;

public class BaseTest
{
    protected IPage Page = null!;
        
    private static readonly IConfiguration configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
    
    private string _pirsoftURL { get; set; } = null!;
    private string _loginUserName { get; set; } = null!;
    private string _loginPassword { get; set; } = null!;
    
    [SetUp]
    public async Task CreateBrowserContext()
    {
        var playwright = await Playwright.CreateAsync();
        var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
        {
            Headless = true,
        });
        Page = await browser.NewPageAsync();
    }
    
    [SetUp]
    public void SetUpAppsettingsContext()
    {
        _pirsoftURL = configuration["PirsoftURL"];
        _loginUserName = configuration["LoginCredentials:UserName"];
        _loginPassword = configuration["LoginCredentials:Password"];
    }
    
    protected async Task Login()
    {
        await Page.GotoAsync(_pirsoftURL);
        await Page.FillAsync("#logging-email", _loginUserName);
        await Page.FillAsync("#logging-password", _loginPassword);
        await Page.ClickAsync("#logging-log-in");
    }
}