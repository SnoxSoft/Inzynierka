using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace Pirsoft.UITests.PageObjects;

public class EmployeesRequestsViewPage : PageTest
{
    private readonly IPage _page;
    private ILocator _nameFilter => _page.Locator("#request-firstname-lastname");
    private ILocator _requests => _page.Locator("#schedule-list");

    public EmployeesRequestsViewPage(IPage page) => _page = page;
    
    //assertions
    public async Task NameFilterIsVisibleAndEnabled()
    {
        await Expect(_nameFilter).ToBeVisibleAsync();
        await Expect(_nameFilter).ToBeEnabledAsync();
    }
    
    public async Task RequestsAreVisibleAndEnabled()
    {
        await Expect(_requests).ToBeVisibleAsync();
        await Expect(_requests).ToBeEnabledAsync();
    }
}