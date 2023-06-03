using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace Pirsoft.UITests.PageObjects;

public class MainViewPage : PageTest
{
    private readonly IPage _page;
    private ILocator _homePageButton => _page.Locator("#header-home");
    private ILocator _profileButton => _page.Locator("#header-profile");
    private ILocator _logOutButton => _page.Locator("#header-log-out");
    private ILocator _employeesMenuButton => _page.Locator("#menu-employees");
    private ILocator _employeesRegisterButton => _page.Locator("#menu-employee-register");
    private ILocator _employeeScheduleButton => _page.Locator("#menu-schedule");
    private ILocator _companyScheduleButton => _page.Locator("#menu-company-schedule");
    private ILocator _companyTeamsButton => _page.Locator("#menu-teams");
    private ILocator _absencesButton => _page.Locator("#menu-absences");
    private ILocator _employeesRequestsButton => _page.Locator("#menu-requests");
        
    public MainViewPage(IPage page) => _page = page;
    
    //actions
    public async Task GoToProfilePage() => await _profileButton.ClickAsync();
    
    //assertions
    public async Task HomePageButtonIsVisibleAndEnabled()
    {
        await Expect(_homePageButton).ToBeVisibleAsync();
        await Expect(_homePageButton).ToBeEnabledAsync();
    }
    
    public async Task ProfilePageButtonIsVisibleAndEnabled()
    {
        await Expect(_profileButton).ToBeVisibleAsync();
        await Expect(_profileButton).ToBeEnabledAsync();
    }
    
    public async Task LogOutButtonIsVisibleAndEnabled()
    {
        await Expect(_logOutButton).ToBeVisibleAsync();
        await Expect(_logOutButton).ToBeEnabledAsync();
    }
    
    public async Task EmployeesMenuButtonIsVisibleAndEnabled()
    {
        await Expect(_employeesMenuButton).ToBeVisibleAsync();
        await Expect(_employeesMenuButton).ToBeEnabledAsync();
    }
    
    public async Task EmployeesRegisterButtonIsVisibleAndEnabled()
    {
        await Expect(_employeesRegisterButton).ToBeVisibleAsync();
        await Expect(_employeesRegisterButton).ToBeEnabledAsync();
    }
    
    public async Task EmployeesScheduleButtonIsVisibleAndEnabled()
    {
        await Expect(_employeeScheduleButton).ToBeVisibleAsync();
        await Expect(_employeeScheduleButton).ToBeEnabledAsync();
    }
    
    public async Task CompanyScheduleButtonIsVisibleAndEnabled()
    {
        await Expect(_companyScheduleButton).ToBeVisibleAsync();
        await Expect(_companyScheduleButton).ToBeEnabledAsync();
    }
    
    public async Task CompanyTeamsButtonIsVisibleAndEnabled()
    {
        await Expect(_companyTeamsButton).ToBeVisibleAsync();
        await Expect(_companyTeamsButton).ToBeEnabledAsync();
    }
    
    public async Task EmployeeAbsenceButtonIsVisibleAndEnabled()
    {
        await Expect(_absencesButton).ToBeVisibleAsync();
        await Expect(_absencesButton).ToBeEnabledAsync();
    }
    
    public async Task EmployeesRequestsButtonIsVisibleAndEnabled()
    {
        await Expect(_employeesRequestsButton).ToBeVisibleAsync();
        await Expect(_employeesRequestsButton).ToBeEnabledAsync();
    }
}