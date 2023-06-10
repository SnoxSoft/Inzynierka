using System.Threading.Tasks;
using NUnit.Framework;
using Pirsoft.UITests.Base;
using Pirsoft.UITests.PageObjects;

namespace Pirsoft.UITests;

public class EmployeesRegisterViewTests : BaseTest
{
    private MainViewPage? _mainViewPage;
    private EmployeesRegisterViewPage? _employeesRegisterViewPage;
    
    [Test]
    public async Task EmployeesRegisterViewFeatures_ForKadryPerspective()
    {
        _mainViewPage = new MainViewPage(Page);
        _employeesRegisterViewPage = new EmployeesRegisterViewPage(Page);
        
        await Login();
        await _mainViewPage.GoToEmployeesRegisterView();
        await _employeesRegisterViewPage.CreateEmployeeButtonIsVisibleAndEnabled();
        await _employeesRegisterViewPage.EmployeeSkillListButtonIsVisibleAndEnabled();  
    }
}