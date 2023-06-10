using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace Pirsoft.UITests.PageObjects;

public class CompanyTeamsViewPage : PageTest
{
    private readonly IPage _page;
    private ILocator _createTeamButton => _page.Locator("#teams-create-team");
    private ILocator _skillFinderButton => _page.Locator("#teams-finder-open");
    public CompanyTeamsViewPage(IPage page) => _page = page;
    
    //assertions
    public async Task CreateTeamButtonIsVisibleAndEnabled()
    {
        await Expect(_createTeamButton).ToBeVisibleAsync();
        await Expect(_createTeamButton).ToBeEnabledAsync();
    }
    
    public async Task TeamSkillFinderButtonIsVisibleAndEnabled()
    {
        await Expect(_skillFinderButton).ToBeVisibleAsync();
        await Expect(_skillFinderButton).ToBeEnabledAsync();
    }
}