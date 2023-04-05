// Opis endpointów

// Dane pracownika //
const endpointGetEmployeeData = "employee";


// Listy wniosków urlopowych //

// Zwraca listę wniosków urlopowych innych pracowników
const endpointGetEmployeesRequests = "getEmployeesRequests";

// Zwraca wszystkie rodzaje statusów wniosków urlopowych
const endpointGetRequestsStatuses = "getRequestsStatus";
const endpointGetAbsencesStatuses = "getAbsencesStatus";

// Zwraca kolory przypisane do statusów wniosków urlopowych
const endpointGetRequestsColors = "getRequestsColors";
const endpointGetAbsencesColors = "getAbsencesColors";

// Zwraca rodzaje dni nieobecności / wniosków urlopowych
const endpointGetRequestsTypes = "getRequestsTypes";
const endpointGetAbsencesTypes = "getAbsencesTypes";

// Wystawianie wniosku urlopowego //

// Zwraca listę osób, która otrzyma wniosek uropowy do wiadomości, do potwierdzenia
const endpointGetRequestApprovers = "getApprovers";

// Zwraca listę nieobecności zalogowanego pracownika
const endpointGetEmployeeAbsences = "getEmployeeAbsences";



// Przypominanie hasła //

// Wysłanie kodu weryfikacyjnego na adres email
const endpointPostSendVerifyCode = "sendVerifyCode";

// Weryfikacja kodu przesłanego na dany email z podanym adresem email
const endpointGetVerifyCode = "verifyCode";

// Zmiana hasła po potwierdzeniu kodu weryfikacyjnego
const endpointPostChangePassword = "changePassword";



// Logowanie sie //

// Zalogowanie sie do aplikacji
const endpointGetLogIn = "getEmployee";



// Harmonogram pracy //

// Zwraca dni urlopowe dla danego pracownika na wybrany miesiąc
const endpointGetEmployeeMonthDaysOff = "monthDays";

// Zwraca nieobecności wszystkich pracownikó na dany miesiąc dla całej firmy
const endpointGetAllCompanyMonthDaysOff = "allCompanyMonthDays";



// Umiejętności pracownika //

// Zwraca listę wszystkich umiejętności istniejących w firmie
const endpointGetAllSkills = "getAllSkills";



// Szukacze list pracowników

// Szukacz pracowników do wybierania dla zespołów i ocen kwartalnych
const endpointGetAllEmployeesForFinder = "getAllEmployeesForPicked"

// Wyszukanie całej listy pracowników w firmie
const endpointGetAllEmployees = "getAllEmployees";

// Wyszukanie listy pracowników według wybranego filtra
const endpointGetEmployees = "getEmployees";



// Lista zespołów //

// Zwraca listę wszystkich zespołów w firmie
const endpointGetAllTeams = "getAllTeams";

// Zwraca pełne informacje na temat wybranego zespołu
const endpointGetTeamData = "getTeamData";

// Zwraca listę wszystkich rodzai zatrudnień w firmie
const endpointGetAllPositions = "getAllPositions";




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
    endpointGetRequestsColors, endpointGetRequestsTypes,
    endpointGetEmployeeAbsences, endpointGetAbsencesStatuses,
    endpointGetAbsencesColors, endpointGetAbsencesTypes,

    endpointGetRequestApprovers,

    endpointPostSendVerifyCode, endpointGetVerifyCode, endpointPostChangePassword,

    endpointGetLogIn,

    endpointGetEmployeeMonthDaysOff, endpointGetAllCompanyMonthDaysOff,

    endpointGetAllSkills, endpointGetAllPositions,

    endpointGetAllEmployeesForFinder, endpointGetAllEmployees, endpointGetEmployees,

    endpointGetAllTeams, endpointGetTeamData,

    endpointGetEmployedYears, endpointGetReceivedYearGrades, endpointGetGivenGrades, endpointGetAvailableQuartets,

    endpointGetEmployeeData,

    endpointGetNotifications, endpointDeleteNotification

    }