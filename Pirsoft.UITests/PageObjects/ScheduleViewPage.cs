using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace Pirsoft.UITests.PageObjects;

public class ScheduleViewPage : PageTest
{
    private readonly IPage _page;
    private ILocator _scheduleFilterButton => _page.Locator("#schedule-filter-button");
    private ILocator _currentMonthSchedule => _page.Locator("#schedule-list-item-0");

    public ScheduleViewPage(IPage page) => _page = page;
    
    //assertions
    public async Task ScheduleButtonIsVisibleAndEnabled()
    {
        await Expect(_scheduleFilterButton).ToBeVisibleAsync();
        await Expect(_scheduleFilterButton).ToBeEnabledAsync();
    }
    
    public async Task CurrentMonthScheduleIsVisibleAndEnabled()
    {
        await Expect(_currentMonthSchedule).ToBeVisibleAsync();
        await Expect(_currentMonthSchedule).ToBeEnabledAsync();
    }
}