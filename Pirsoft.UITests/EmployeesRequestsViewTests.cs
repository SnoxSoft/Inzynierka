using System.Threading.Tasks;
using NUnit.Framework;
using Pirsoft.UITests.Base;
using Pirsoft.UITests.PageObjects;

namespace Pirsoft.UITests;

public class EmployeesRequestsViewTests : BaseTest
{
    private MainViewPage? _mainViewPage;
    private EmployeesRequestsViewPage? _employeesRequestsViewPage;
    
    [Test]
    public async Task EmployeesViewFeatures_ForKadryPerspective()
    {
        _mainViewPage = new MainViewPage(Page);
        _employeesRequestsViewPage = new EmployeesRequestsViewPage(Page);
        
        await Login();
        await _mainViewPage.GoToEmployeesRequests();
        await _employeesRequestsViewPage.RequestsAreVisibleAndEnabled();
        await _employeesRequestsViewPage.NameFilterIsVisibleAndEnabled();
    }
}