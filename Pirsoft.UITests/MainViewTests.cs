using System.Threading.Tasks;
using NUnit.Framework;
using Pirsoft.UITests.Base;
using Pirsoft.UITests.PageObjects;

namespace Pirsoft.UITests;

[TestFixture]
public class MainViewTests : BaseTest
{
    private MainViewPage? _mainViewPage;
    
    [Test]
    public async Task MainViewFeatures_ForKadryPerspective()
    {
        _mainViewPage = new MainViewPage(Page);
        
        await Login();
        await _mainViewPage.HomePageButtonIsVisibleAndEnabled();
        await _mainViewPage.ProfilePageButtonIsVisibleAndEnabled();
        await _mainViewPage.LogOutButtonIsVisibleAndEnabled();
        await _mainViewPage.EmployeesMenuButtonIsVisibleAndEnabled();
        await _mainViewPage.EmployeesRegisterButtonIsVisibleAndEnabled();
        await _mainViewPage.EmployeesScheduleButtonIsVisibleAndEnabled();
        await _mainViewPage.CompanyScheduleButtonIsVisibleAndEnabled();
        await _mainViewPage.CompanyTeamsButtonIsVisibleAndEnabled();
        await _mainViewPage.EmployeeAbsenceButtonIsVisibleAndEnabled();
        await _mainViewPage.EmployeesRequestsButtonIsVisibleAndEnabled();
    }
}