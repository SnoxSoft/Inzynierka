
// Adres ip aplikacji
const serverIp = "http://127.0.0.1:3001";

const serverIpProd = "https://localhost:7120";

// Nazwa aplikacji
const appName = "PIRSOFT";

// Nazwy stron na pasku zadań
const pageNameRemind = appName + ": Przypomnienie hasła";
const pageNameAbsences = appName + ": Moje nieobecności"
const pageNameLogging = appName + ": Okno logowania";
const pageNameHomePage = appName + ": Ekran powitalny";
const pageNameAddEmployeeAnAbsence = appName + ": Wystaw wniosek";
const pageNameApprovalOrRejectionRequest = appName + ": Zatwierdzanie wniosku urlopowego";
const pageNameCompanySchedule = appName + ": Harmonogram firmowy";
const pageNameEmployees = appName + ": Lista wszystkich pracowników";
const pageNameSchedule = appName + ": Harmonogram osobisty";
const pageNameEmployeeRegister = appName + ": Rejestracja nowego pracownika";
const pageNameEmployeeData = appName + ": Twoje dane";
const pageNameEmployeeView = appName + ": Wyświetlanie danych pracownika";
const pageNameTeams = appName + ": Zespoły w firmie";
const pageNameTeamEdit = appName + ": Edycja danych zespołu";
const pageNameTeamCreate = appName + ": Tworzenie zespołu";
const pageNameTeamView = appName + ": Wyświetlanie danych zespołu";
const pageNameReceivedGrades = appName + ": Moje oceny kwartalne";
const pageNameGivenGrades = appName + ": Oceny pracowników";
const pageNameEmployeesFinder = appName + ": Wyszukiwarka pracowników";
const pageNameGrades = appName + ": Oceny kwartalne";
const pageNameGiveGradesWindowView = appName + ": Ocena pracownika";
const pageNameGiveGradesWindowGive = appName + ": Ocenianie pracownika";
const pageNameRequest = appName + ": Wniosek";
const pageNameRequests = appName + ": Wnioski pracowników";
const pageNameNotifications = appName + ": Powiadomienia";
const pageSkillPicker = appName + ": Wybór umiejętności";
const pagePasswordEdit = appName + ": Edycja hasła";
const pagePasswordChange = appName + ": Zmiana hasła";


// Strona powitalna, logowanie
const welcomeMessage = "Witaj, zaloguj się";
const welcomeMessageShort = "Witaj, ";
const labelEmail = "E-mail";

const labelPassword = "Hasło";

const labelChangePassword = "Zmień hasło";

// Nazwa wyświetlająca się jak nie ma awataru
const avatarAlterText = "Moje konto";

// Lewe menu aplikacji
const employeesMenu = "Pracownicy";
const employeeRegisterMenu = "Rejestracja";
const scheduleMenu = "Harmonogram osobisty";
const companyScheduleMenu = "Harmonogram firmy";
const teamsMenu = "Zespoły w firmie";
const absencesMenu = "Moje nieobecności";
const requestsMenu = "Wnioski pracowników";
const gradesMenu = "Oceny kwartalne";
const gradeMenu = "Ocena kwartalna";

// Nazwy guzików
const labelFind = "Szukaj";
const labelLogIn = "Zaloguj";
const labelFilter = "Filtruj";
const labelClose = "Zamknij";
const labelApprove = "Zatwierdź";
const labelChange = "Zmień";
const labelEdit = "Edytuj";
const labelDisapprove = "Odrzuć";
const labelDelete = "Usuń";
const labelPick = "Wybierz";
const labelClear = "Wyczyść";
const labelBack = "Wstecz";
const labelCreate = "Utwórz";
const labelSave = "Zapisz";

// Rekordy uzupełniające listy
const teamAdditionalRow = "Wybierz zespół...";
const positionAdditionalRow = "Wybierz stanowisko...";
const positionLevelAdditionalRow = "Wybierz poziom stanowiska...";

const contractAdditionalRow = "Wybierz rodzaj umowy...";

const yearAdditionalRow = "Wybierz rok...";

// Wybieranie wniosku urlopowego komponenty
const labelRequestType = "Rodzaj";

// Nieobecności/wnioski komponenty
const labelRequest = "Wniosek";
const labelFromTimeOfAbsence = "W terminie";
const labelFromTimeOfRequest = "w terminie";
const labelShowProfile = "Pokaż profil";

const alertCantGoFurther = "Nie możesz przejść poza zakres...";

// Nazwy dotyczące komponentu kalendarza
const calendarLabelFrom = "Od:";
const calendarLabelTo = "Do:";

const skillsLabel = "Umiejętności";

const labelFirstNameAndLastName = "Imie i nazwisko:";

const gradeMessageLabel = "Treść";
const gradeTitleLabel = "Tytuł";
const gradePersonLabel = "Osoba";
const employeeGradeText = "Ocena pracownika:";
const employeeGradedText = "Ocenił pracownik:";

// Filtr wniosków urlopowych
const firstnameLabel = "Imie";
const lastnameLabel = "Nazwisko";
const labelTeam = "Zespół"

// Nagłowek moich nieobecności urlopowych
const headerAbsencesEndOfDaysOff = "Zostało dni urlopowych";
const headerAbsencesDaysNoPayLeft = "w tym na żądanie";

// Statusy filtrów wniosków urlopowych
const requestStatusWaitingLabel = "Oczekujące";
const requestStatusApprovedLabel = "Zatwierdzone";
const requestStatusDisapprovedLabel = "Odrzucone";
const requestStatusCreatedByMeLabel = "Wystawione przeze mnie";
const requestStatusCreatedNotByMeLabel = "Nie wystawione przeze mnie";

// Nagłówek miesięcy pracy zalogowanego pracownika
const monthsOfYourWorkLabel = "Miesiące Twojej pracy";
const legendLabel = "Legenda";
const legendToday = "Dziś";

// Dane wniosków urlopowych
const requestDescriptionLabel = "Opis wniosku";
const requestStatusLabel = "Status";
const requestActionLabel = "Akcje";
const labelRequestNoPay = "Urlop bezpłatny";
const labelRequestApprovers = "Zatwierdza";

// Dane pracownika
const labelBankAccount = "Konto bankowe";
const labelBirthDate = "Data urodzenia";
const labelPESEL = " PESEL";
const labelSalary = "Wynagrodzenie brutto";
const labelContractType = "Typ umowy";
const labelPosition = "Stanowisko";

const labelPositionLevel = "Poziom stanowiska";
const labelStartDate = "Rozpoczęcie pracy";


// Oceny kwartalne
const labelGivenGrades = "Wystawione oceny";
const labelReceivedGrades = "Otrzymane oceny";

const labelQuarter = "Kwartał";

// Edycja/ tworzenie/ wyświetlenie zespołu
const labelTeamName = "Nazwa zespołu";
const labelStrongSkills = "Silne cechy zespołu";
const labelTeamManager = "Kierownik zespołu";
const labelTeamMembers = "Członkowie zespołu";
const labelCreateTeam = "Dodaj zespoł";

// Przypomnienie hasła
const labelRemindPassword = "Przypomnij hasło";
const labelGiveEmail = "Podaj e-mail";
const labelVerificationCode = "Kod weryfikacyjny";
const labelGiveOldPassword = "Podaj stare hasło";
const labelGiveNewPassword = "Podaj nowe hasło";
const labelGiveNewPasswordAgain = "Powtórz nowe hasło";
const labelSendVerificationEmail = "Wyślij email do zmiany hasła";
const headerPasswordChange = "Zmiana hasła";

const weekdays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

const quarters = ["Q1","Q2","Q3","Q4"];

const headerEmployeesFinder = "Wyszukiwarka pracowników";
const headerEmployeesFinderList = "Imie i nazwisko, Zespół, Stanowisko, Umiejętności"
const labelEmployeeFinderExchanceEmployeesBetween = "Wymień aktualnego i wybranego pracownika pomiędzy zespołami";
const headerEmployees = "Wyszukaj pracownika";
const labelSwapInformation = "Osoby zostaną wymienione pomiędzy zespołami po zapisaniu zmian w aktualnie edytowanym zespole";
const labelPersonChangedWith = "zamieniona z osobą";
const labelAllPeopleChangedBetweenTeams = "Zamienione osoby pomiędzy zespołami";

// Powiadomienia

const labelNotifications = "Powiadomienia";


// Wiadomości informacyjne w oknie przypominania hasła
const alertMessageSent = "Wiadomość została wysłana";
const alertPasswordChanged = "Hasło zostało zmienione. \nZa chwilę nastąpi przekierowanie";
const alertWrongEmail = "Wprowadzony email jest błędny";
const alertUnexpectedError = "Wystapił nieoczekiwany błąd, spróbuj ponownie za chwilę";
const alertPutNewPasswords = "Wpisz nowe hasła w pola";
const alertNewPasswordsAreIncompatible = "Wpisane nowe hasła są niezgodne";
const alertOldPasswordIsIncompatible = "Wpisane stare hasło jest błędne";
const alertOldPasswordIsMissing = "Wpisz stare hasło";

export {serverIp, serverIpProd, appName, avatarAlterText, welcomeMessage, welcomeMessageShort, labelEmail, labelPassword, labelChangePassword, labelSave, labelCreate,
    labelFind, labelFilter, labelClose, labelApprove, labelDisapprove, labelDelete, labelPick, labelClear, labelChange, labelBack, labelLogIn, labelEdit,

    labelNotifications,

    pageNameRemind, pageNameEmployeeRegister, pageNameGiveGradesWindowGive, pageNameGiveGradesWindowView, pageNameTeamEdit, pageNameTeamCreate,
    pageNameEmployees, pageNameTeamView, pageNameLogging, pageNameSchedule, pageNameHomePage, pageNameAbsences, pageNameAddEmployeeAnAbsence,
    pageNameApprovalOrRejectionRequest, pageNameCompanySchedule, pageNameEmployeeData, pageNameEmployeesFinder, pageNameEmployeeView, pageNameGivenGrades,
    pageNameReceivedGrades, pageNameGrades, pageNameRequest, pageNameRequests, pageNameTeams, pageNameNotifications, pageSkillPicker, pagePasswordEdit,
    pagePasswordChange,

    calendarLabelFrom, calendarLabelTo,
    labelRequest, labelShowProfile, alertCantGoFurther,
    labelFromTimeOfAbsence, labelFromTimeOfRequest,
    teamAdditionalRow, positionAdditionalRow, positionLevelAdditionalRow, contractAdditionalRow, yearAdditionalRow,
    employeesMenu,
    employeeRegisterMenu,
    scheduleMenu,
    companyScheduleMenu,
    teamsMenu,
    absencesMenu ,
    requestsMenu,
    gradesMenu,
    gradeMenu,

    labelBirthDate,labelPESEL,labelStartDate,labelSalary,labelPosition, labelPositionLevel,labelBankAccount,labelContractType,

    skillsLabel, labelFirstNameAndLastName, gradeMessageLabel, gradeTitleLabel, gradePersonLabel,
    employeeGradeText, employeeGradedText,
    firstnameLabel, lastnameLabel, labelTeam,
    requestStatusWaitingLabel,
    requestStatusApprovedLabel,
    requestStatusDisapprovedLabel,
    requestStatusCreatedByMeLabel,
    requestStatusCreatedNotByMeLabel,

    monthsOfYourWorkLabel,
    legendLabel, legendToday,

    weekdays, months, quarters,

    requestStatusLabel, requestActionLabel, requestDescriptionLabel,
    labelRequestType, labelRequestNoPay, labelRequestApprovers,

    labelSendVerificationEmail, labelRemindPassword, labelGiveEmail,
    labelVerificationCode, labelGiveNewPassword, labelGiveNewPasswordAgain, labelGiveOldPassword, headerPasswordChange,

    alertMessageSent,
    alertPasswordChanged,
    alertWrongEmail,
    alertUnexpectedError,
    alertPutNewPasswords,
    alertNewPasswordsAreIncompatible,
    alertOldPasswordIsIncompatible,
    alertOldPasswordIsMissing,

    labelReceivedGrades, labelGivenGrades, labelQuarter,

    headerEmployeesFinder, headerEmployeesFinderList, labelEmployeeFinderExchanceEmployeesBetween,

    headerEmployees,

    headerAbsencesDaysNoPayLeft, headerAbsencesEndOfDaysOff,
    labelSwapInformation,

    labelStrongSkills, labelTeamManager, labelTeamMembers, labelTeamName, labelPersonChangedWith, labelAllPeopleChangedBetweenTeams, labelCreateTeam
};