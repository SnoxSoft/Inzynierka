// Opis endpointów

// Dane pracownika //
const endpointGetEmployeeData = "get/employee";

const endpointPostCreateEmployee = "create/new/employee";

// Listy wniosków urlopowych //

// Zwraca listę wniosków urlopowych innych pracowników
const endpointGetEmployeesRequests = "getEmployeesRequests";

// Zwraca wszystkie rodzaje statusów wniosków urlopowych
const endpointGetRequestsStatuses = "get/absence/statuses";

// Zwraca rodzaje dni nieobecności / wniosków urlopowych
const endpointGetAbsencesTypes = "get/absence/types";

// Wystawianie wniosku urlopowego //

// Zwraca listę osób, która otrzyma wniosek uropowy do wiadomości, do potwierdzenia
const endpointGetRequestApprovers = "getApprovers";


// Przypominanie hasła //

// Wysłanie kodu weryfikacyjnego na adres email
const endpointPostSendEmailForPasswordChange = "sendVerifyCode";

// Weryfikacja kodu przesłanego na dany email z podanym adresem email
const endpointGetVerifyCode = "verifyCode";

const endpointGetChangePassword = "get/change-password"

// Zmiana hasła po potwierdzeniu kodu weryfikacyjnego
const endpointPostChangePassword = "changePassword";

const endpointPutChangePassword = "changePassword";

// Edycja hasła pracownika w profilu
const endpointEmployeeChangePassword = "changePassword"



// Logowanie sie //

// Zalogowanie sie do aplikacji
const endpointGetLogIn = "getEmployee";



// Harmonogram pracy //

// Zwraca dni urlopowe dla danego pracownika na wybrany miesiąc
const endpointGetEmployeeMonthDaysOff = "get/employee/absences";

// Zwraca nieobecności wszystkich pracownikó na dany miesiąc dla całej firmy
const endpointGetAllCompanyMonthDaysOff = "get/employees/absences";



// Umiejętności pracownika //

// Zwraca listę wszystkich umiejętności istniejących w firmie
const endpointGetAllSkills = "get/skills";

// Szukacze list pracowników

// Wyszukanie całej listy pracowników w firmie
const endpointGetAllEmployees = "get/employees";

// Lista zespołów //

// Zwraca listę wszystkich zespołów w firmie
const endpointGetAllTeams = "get/departments";

// Zwraca pełne informacje na temat wybranego zespołu
const endpointGetTeamData = "get/department";

// Zwraca listę wszystkich rodzai zatrudnień w firmie
const endpointGetAllPositions = "get/company/roles";
// Zwraca listę umów
const endpointGetAllContracts = "get/contracts";


//Zwraca listę wszystkich poziomów zatrudnień
const endpointGetAllPositionsLevels = "get/seniority/levels";

// Oceny kwartalne //

// Zwraca lata w których dany pracownik jest zatrudniony
const endpointGetEmployedYears = "getYears"

// Zwraca listę ocen otrzymanych na dany, wybrany rok dla zalogowanego pracownika
const endpointGetReceivedYearGrades = "getGrades";

// Zwraca listę ocen wypisanych przez zalogowanego pracownika według filtru
const endpointGetGivenGrades = "getGivenGrades";

// Zwraca możliwe kwartał do wyboru dla danego pracownika, któremu wystawiamy ocenę
const endpointGetAvailableQuartets = "getAvailableQuartets";



// Powiadomienia //
const endpointGetNotifications = "getNotifications";

// Usunięcie wyskakującego powiadomienia
const endpointDeleteNotification = "deleteNotification";


export {
    endpointGetEmployeesRequests, endpointGetRequestsStatuses,
    endpointGetAbsencesTypes,

    endpointGetRequestApprovers,

    endpointPostSendEmailForPasswordChange, endpointGetVerifyCode, endpointGetChangePassword,
    endpointPostChangePassword, endpointPutChangePassword, endpointEmployeeChangePassword,

    endpointGetLogIn,

    endpointGetEmployeeMonthDaysOff, endpointGetAllCompanyMonthDaysOff,

    endpointGetAllSkills, endpointGetAllPositions, endpointGetAllPositionsLevels, endpointGetAllContracts,

    endpointGetAllEmployees,

    endpointGetAllTeams, endpointGetTeamData,

    endpointGetEmployedYears, endpointGetReceivedYearGrades, endpointGetGivenGrades, endpointGetAvailableQuartets,

    endpointGetEmployeeData, endpointPostCreateEmployee,

    endpointGetNotifications, endpointDeleteNotification

    }