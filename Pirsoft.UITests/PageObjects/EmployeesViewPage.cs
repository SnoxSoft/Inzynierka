using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace Pirsoft.UITests.PageObjects;

public class EmployeesViewPage : PageTest
{
    private readonly IPage _page;
    private ILocator _employeesFilter => _page.Locator("#employees-firstname-lastname");
    private ILocator _findEmployeeButton => _page.Locator("#employees-find");
    private ILocator _firstEmployeeOnList => _page.Locator("#employees-list-item-0");
    
    public EmployeesViewPage(IPage page) => _page = page;
    
    //assertions
    public async Task EmployeesFilterIsVisibleAndEnabled()
    {
        await Expect(_employeesFilter).ToBeVisibleAsync();
        await Expect(_employeesFilter).ToBeEnabledAsync();
    }
    
    public async Task FindEmployeesButtonIsVisibleAndEnabled()
    {
        await Expect(_findEmployeeButton).ToBeVisibleAsync();
        await Expect(_findEmployeeButton).ToBeEnabledAsync();
    }
    
    public async Task EmployeesAreVisibleOnList() => await Expect(_firstEmployeeOnList).ToBeVisibleAsync();

}