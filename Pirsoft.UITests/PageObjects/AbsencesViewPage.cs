using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace Pirsoft.UITests.PageObjects;

public class AbsencesViewPage : PageTest
{
    private readonly IPage _page;
    private ILocator _absenceRequestButton => _page.Locator("#request");
    private ILocator _absenceFilterButton => _page.Locator("#absences-filter");

    public AbsencesViewPage(IPage page) => _page = page;
    
    //assertions
    public async Task AbsenceRequestButtonIsVisibleAndEnabled()
    {
        await Expect(_absenceRequestButton).ToBeVisibleAsync();
        await Expect(_absenceRequestButton).ToBeEnabledAsync();
    }
    
    public async Task AbsenceFilterButtonIsVisibleAndEnabled()
    {
        await Expect(_absenceFilterButton).ToBeVisibleAsync();
        await Expect(_absenceFilterButton).ToBeEnabledAsync();
    }
}