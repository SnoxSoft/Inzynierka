using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace Pirsoft.UITests.PageObjects;

public class ProfileViewPage : PageTest
{
    private readonly IPage _page;
    private ILocator _employeeFirstName => _page.Locator("#employee-firstname");
    private ILocator _employeeLastName => _page.Locator("#employee-lastname");
    private ILocator _employeeEmail => _page.Locator("#employee-email");
    private ILocator _employeeBankAccount => _page.Locator("#employee-bank-number");
    private ILocator _employeeBirthDate => _page.Locator("#employee-birth-date");
    private ILocator _employeePesel => _page.Locator("#employee-pesel");
    private ILocator _employeeSalary => _page.Locator("#employee-salary");
    private ILocator _employeePasswordChangeButton => _page.Locator("employee-password-change");
    
    public ProfileViewPage(IPage page) => _page = page;
    
    //assertions
    public async Task EmployeeFirstNameIsVisible() => await Expect(_employeeFirstName).ToBeVisibleAsync();
    public async Task EmployeeLastNameIsVisible() => await Expect(_employeeLastName).ToBeVisibleAsync();
    public async Task EmployeeEmailIsVisible() => await Expect(_employeeEmail).ToBeVisibleAsync();
    public async Task EmployeeBankAccountIsVisible() => await Expect(_employeeBankAccount).ToBeVisibleAsync();
    public async Task EmployeeBirthDateIsVisible() => await Expect(_employeeBirthDate).ToBeVisibleAsync();
    public async Task EmployeePeselIsVisible() => await Expect(_employeePesel).ToBeVisibleAsync();
    public async Task EmployeeSalaryIsVisible() => await Expect(_employeeSalary).ToBeVisibleAsync();

    public async Task EmployeePasswordResetButtonIsVisibleAndEnabled()
    {
        await Expect(_employeePasswordChangeButton).ToBeVisibleAsync();
        await Expect(_employeePasswordChangeButton).ToBeEnabledAsync();
    }
}