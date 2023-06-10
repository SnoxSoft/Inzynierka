using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace Pirsoft.UITests.PageObjects;

public class CompanyScheduleViewPage : PageTest
{
    private readonly IPage _page;
    private ILocator _todayCompanySchedule => _page.Locator("#company-schedule-today");
    private ILocator _companyScheduleList => _page.Locator("#schedule-company-list");

    public CompanyScheduleViewPage(IPage page) => _page = page;
    
    //assertions
    public async Task TodayCompanyScheduleButtonIsVisibleAndEnabled()
    {
        await Expect(_todayCompanySchedule).ToBeVisibleAsync();
        await Expect(_todayCompanySchedule).ToBeEnabledAsync();
    }
    
    public async Task CompanyScheduleListIsVisibleAndEnabled()
    {
        await Expect(_companyScheduleList).ToBeVisibleAsync();
        await Expect(_companyScheduleList).ToBeEnabledAsync();
    }
}