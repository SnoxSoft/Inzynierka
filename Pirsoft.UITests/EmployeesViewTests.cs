using System.Threading.Tasks;
using NUnit.Framework;
using Pirsoft.UITests.Base;
using Pirsoft.UITests.PageObjects;

namespace Pirsoft.UITests;

public class EmployeesViewTests : BaseTest
{
    private MainViewPage? _mainViewPage;
    private EmployeesViewPage? _employeesViewPage;
    
    [Test]
    public async Task EmployeesViewFeatures_ForKadryPerspective()
    {
        _mainViewPage = new MainViewPage(Page);
        _employeesViewPage = new EmployeesViewPage(Page);
        
        await Login();
        await _mainViewPage.GoToEmployeesMenu();
        await _employeesViewPage.EmployeesFilterIsVisibleAndEnabled();
        await _employeesViewPage.FindEmployeesButtonIsVisibleAndEnabled();
        await _employeesViewPage.EmployeesAreVisibleOnList();
    }
}