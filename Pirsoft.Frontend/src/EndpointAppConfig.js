// Opis endpointów

// Dane pracownika //
const endpointGetEmployeeData = "get/employee";

const endpointPostCreateEmployee = "create/new/employee";

const endpointPutEditEmployee = "edit/employee";

const endpointDeleteEmployee = "delete/employee";

// Listy wniosków urlopowych //

// Zwraca wszystkie rodzaje statusów wniosków urlopowych
const endpointGetRequestsStatuses = "get/absence/statuses";

// Zwraca rodzaje dni nieobecności / wniosków urlopowych
const endpointGetAbsencesTypes = "get/absence/types";

// Przypominanie hasła //

// Wysłanie kodu weryfikacyjnego na adres email
const endpointPostSendCodeInEmail = "send/password/reset";

// Zmiana hasła po potwierdzeniu kodu weryfikacyjnego

const endpointPutChangePassword = "reset/code/change/password";

// Edycja hasła pracownika w profilu
const endpointEmployeeChangePassword = "change/password"


// Logowanie sie //

// Zalogowanie sie do aplikacji
const endpointGetLogIn = "api/authenticate";


// Harmonogram pracy //

// Zwraca dni urlopowe dla danego pracownika na wybrany miesiąc
const endpointGetOneEmployeeBetweenDatesDaysOff = "get/employee/absences";

// Zwraca nieobecności wszystkich pracownikó na dany miesiąc dla całej firmy
const endpointGetAllEmployeesBetweenDatesDaysOff = "get/all/employee/absences";

const endpointPostCreateAbsence = "create/new/absence"

const endpointPutEditAbsence = "edit/absence";
const endpointDeleteAbsence = "delete/absence";


// Umiejętności pracownika //

// Zwraca listę wszystkich umiejętności istniejących w firmie
const endpointGetAllSkills = "get/skills";

// Szukacze list pracowników

// Wyszukanie całej listy pracowników w firmie
const endpointGetAllEmployees = "get/employees";

// Lista zespołów //

// Zwraca listę wszystkich zespołów w firmie
const endpointCreateTeam = "create/department";
const endpointEditTeam = "edit/department";
const endpointDeleteTeam = "delete/department";

const endpointGetAllTeams = "get/departments";

// Zwraca pełne informacje na temat wybranego zespołu
const endpointGetTeamData = "get/department";

// Zwraca listę wszystkich rodzai zatrudnień w firmie
const endpointGetAllPositions = "get/company/roles";
// Zwraca listę umów
const endpointGetAllContracts = "get/contracts";


//Zwraca listę wszystkich poziomów zatrudnień
const endpointGetAllPositionsLevels = "get/seniority/levels";

// Powiadomienia

// Zwraca listę powiadomień dla danego użytkownika
const endpointGetEmployeeNotifications = "get/notifications";

// Usuwanie pojedynczego wpisu powiadomienia
const endpointDeleteNotification = "delete/notification";


// Oceny kwartalne

// Zwraca listę otrzymanych ocen dla zalogowanego użytkownika na określony rok

const endpointGetReceivedGrades = "get/received/grades";

const endpointGetGivenGrades = "get/given/grades";

const endpointGetYears = "get/years";

const endpointGetAvailableQuarters ="get/available/quartets";

const endpointPostCreateGrade = "create/new/grade";

export {
    endpointGetRequestsStatuses,
    endpointGetAbsencesTypes, endpointPutEditEmployee,
    endpointPostCreateAbsence,
    endpointPutEditAbsence,
    endpointDeleteAbsence,

    endpointPostSendCodeInEmail,
    endpointPutChangePassword, endpointEmployeeChangePassword, endpointDeleteEmployee,

    endpointGetLogIn,

    endpointGetOneEmployeeBetweenDatesDaysOff, endpointGetAllEmployeesBetweenDatesDaysOff,

    endpointGetAllSkills, endpointGetAllPositions, endpointGetAllPositionsLevels, endpointGetAllContracts,

    endpointGetAllEmployees,

    endpointGetAllTeams, endpointGetTeamData,
    endpointCreateTeam, endpointDeleteTeam, endpointEditTeam,

    endpointGetEmployeeData, endpointPostCreateEmployee,

    endpointGetEmployeeNotifications, endpointDeleteNotification,

    endpointGetReceivedGrades, endpointGetGivenGrades, endpointGetYears, endpointGetAvailableQuarters, endpointPostCreateGrade

    }