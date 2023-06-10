using System.Threading.Tasks;
using NUnit.Framework;
using Pirsoft.UITests.Base;
using Pirsoft.UITests.PageObjects;

namespace Pirsoft.UITests;

public class CompanyScheduleViewTests : BaseTest
{
    private MainViewPage? _mainViewPage;
    private CompanyScheduleViewPage? _companyScheduleViewPage;
    
    [Test]
    public async Task CompanyScheduleViewFeatures_ForKadryPerspective()
    {
        _mainViewPage = new MainViewPage(Page);
        _companyScheduleViewPage = new CompanyScheduleViewPage(Page);
        
        await Login();
        await _mainViewPage.GoToCompanyScheduleView();
        await _companyScheduleViewPage.TodayCompanyScheduleButtonIsVisibleAndEnabled();
        await _companyScheduleViewPage.CompanyScheduleListIsVisibleAndEnabled();
    }
}