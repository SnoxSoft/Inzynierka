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

// Wystawianie wniosku urlopowego //

// Zwraca listę osób, która otrzyma wniosek uropowy do wiadomości, do potwierdzenia
const endpointGetRequestApprovers = "getApprovers";


// Przypominanie hasła //

// Wysłanie kodu weryfikacyjnego na adres email
const endpointPostSendEmailForPasswordChange = "sendVerifyCode";

const endpointGetChangePassword = "get/change-password"

// Zmiana hasła po potwierdzeniu kodu weryfikacyjnego

const endpointPutChangePassword = "changePassword";

// Edycja hasła pracownika w profilu
const endpointEmployeeChangePassword = "changePassword"


// Logowanie sie //

// Zalogowanie sie do aplikacji
const endpointGetLogIn = "getEmployee";


// Harmonogram pracy //

// Zwraca dni urlopowe dla danego pracownika na wybrany miesiąc
const endpointGetOneEmployeeBetweenDatesDaysOff = "get/employee/absences";

// Zwraca nieobecności wszystkich pracownikó na dany miesiąc dla całej firmy
const endpointGetAllEmployeesBetweenDatesDaysOff = "get/all/employee/absences";

const endpointPostCreateAbsence = "create/new/absence"


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

export {
    endpointGetRequestsStatuses,
    endpointGetAbsencesTypes, endpointPutEditEmployee,
    endpointPostCreateAbsence,

    endpointGetRequestApprovers,

    endpointPostSendEmailForPasswordChange, endpointGetChangePassword,
    endpointPutChangePassword, endpointEmployeeChangePassword, endpointDeleteEmployee,

    endpointGetLogIn,

    endpointGetOneEmployeeBetweenDatesDaysOff, endpointGetAllEmployeesBetweenDatesDaysOff,

    endpointGetAllSkills, endpointGetAllPositions, endpointGetAllPositionsLevels, endpointGetAllContracts,

    endpointGetAllEmployees,

    endpointGetAllTeams, endpointGetTeamData,
    endpointCreateTeam, endpointDeleteTeam, endpointEditTeam,

    endpointGetEmployeeData, endpointPostCreateEmployee

    }