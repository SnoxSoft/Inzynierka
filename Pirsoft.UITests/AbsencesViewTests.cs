using System.Threading.Tasks;
using NUnit.Framework;
using Pirsoft.UITests.Base;
using Pirsoft.UITests.PageObjects;

namespace Pirsoft.UITests;

public class AbsencesViewTests : BaseTest
{
    private MainViewPage? _mainViewPage;
    private AbsencesViewPage? _absencesViewPage;
    
    [Test]
    public async Task AbsencesViewFeatures_ForKadryPerspective()
    {
        _mainViewPage = new MainViewPage(Page);
        _absencesViewPage = new AbsencesViewPage(Page);
        
        await Login();
        await _mainViewPage.GoToAbsencesView();
        await _absencesViewPage.AbsenceRequestButtonIsVisibleAndEnabled();
        await _absencesViewPage.AbsenceFilterButtonIsVisibleAndEnabled();
    }
}