using System.Threading.Tasks;
using NUnit.Framework;
using Pirsoft.UITests.Base;
using Pirsoft.UITests.PageObjects;

namespace Pirsoft.UITests;

[TestFixture]
public class ProfileViewTests : BaseTest
{
    private MainViewPage? _mainViewPage;
    private ProfileViewPage? _profileViewPage;

    [Test]
    public async Task ProfileViewFeatures_ForKadryPerspective()
    {
        _mainViewPage = new MainViewPage(Page);
        _profileViewPage = new ProfileViewPage(Page);

        await Login();
        await _mainViewPage.GoToProfilePage();
        await _profileViewPage.EmployeeFirstNameIsVisible();
        await _profileViewPage.EmployeeLastNameIsVisible();
        await _profileViewPage.EmployeeEmailIsVisible();
        await _profileViewPage.EmployeeBankAccountIsVisible();
        await _profileViewPage.EmployeeBirthDateIsVisible();
        await _profileViewPage.EmployeePeselIsVisible();
        await _profileViewPage.EmployeeSalaryIsVisible();
        await _profileViewPage.EmployeePasswordResetButtonIsVisibleAndEnabled();
    }
}