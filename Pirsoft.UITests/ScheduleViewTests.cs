using System.Threading.Tasks;
using NUnit.Framework;
using Pirsoft.UITests.Base;
using Pirsoft.UITests.PageObjects;

namespace Pirsoft.UITests;

public class ScheduleViewTests : BaseTest
{
    private MainViewPage? _mainViewPage;
    private ScheduleViewPage? _scheduleViewPage;
    
    [Test]
    public async Task ScheduleViewFeatures_ForKadryPerspective()
    {
        _mainViewPage = new MainViewPage(Page);
        _scheduleViewPage = new ScheduleViewPage(Page);
        
        await Login();
        await _mainViewPage.GoToScheduleView();
        await _scheduleViewPage.ScheduleButtonIsVisibleAndEnabled();
        await _scheduleViewPage.CurrentMonthScheduleIsVisibleAndEnabled();
    }
}