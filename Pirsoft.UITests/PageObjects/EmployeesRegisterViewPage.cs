using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace Pirsoft.UITests.PageObjects;

public class EmployeesRegisterViewPage : PageTest
{
    private readonly IPage _page;
    private ILocator _createEmployeeButton => _page.Locator("#employee-create");
    private ILocator _employeeSkillListButton => _page.Locator("#employee-skill-pick");
    public EmployeesRegisterViewPage(IPage page) => _page = page;

    public async Task CreateEmployeeButtonIsVisibleAndEnabled()
    {
        await Expect(_createEmployeeButton).ToBeVisibleAsync();
        await Expect(_createEmployeeButton).ToBeEnabledAsync();
    }
    
    public async Task EmployeeSkillListButtonIsVisibleAndEnabled()
    {
        await Expect(_employeeSkillListButton).ToBeVisibleAsync();
        await Expect(_employeeSkillListButton).ToBeEnabledAsync();
    }
}