using System.Threading.Tasks;
using NUnit.Framework;
using Pirsoft.UITests.Base;
using Pirsoft.UITests.PageObjects;

namespace Pirsoft.UITests;

public class CompanyTeamsViewTests : BaseTest
{
    private MainViewPage? _mainViewPage;
    private CompanyTeamsViewPage? _companyTeamsViewPage;
    
    [Test]
    public async Task CompanyTeamsViewFeatures_ForKadryPerspective()
    {
        _mainViewPage = new MainViewPage(Page);
        _companyTeamsViewPage = new CompanyTeamsViewPage(Page);
        
        await Login();
        await _mainViewPage.GoToCompanyTeamsView();
        await _companyTeamsViewPage.CreateTeamButtonIsVisibleAndEnabled();
        await _companyTeamsViewPage.TeamSkillFinderButtonIsVisibleAndEnabled();
    }
}