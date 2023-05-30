using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace Pirsoft.UITests.PageObjects;

public class MainViewPage : PageTest
{
    private readonly IPage _page;
    private ILocator _profileButton => _page.Locator("#header-profile");
    public MainViewPage(IPage page) => _page = page;
    
    //actions
    public async Task GoToProfilePage() => await _profileButton.ClickAsync();
    
    //assertions
}