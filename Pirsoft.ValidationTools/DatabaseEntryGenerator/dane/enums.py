from enum import Enum


class SeniorityLevel(Enum):
    Junior = 1
    Inny = 2
    Mid = 3
    Senior = 4


class CompanyRoles(Enum):
    Administrator = 1
    Kadry = 2
    Kierownik = 3
    Ksiegowosc = 4
    Pracownik = 5
    Prezes = 6
    Zarzad = 7


class ContractTypes(Enum):
    B2B = 1
    Nieprzypisany = 2
    UmowaODzielo = 3
    UmowaOPrace = 4
    UmowaZlecenie = 5


class Skills(Enum):
    SQL = 1
    Java = 2
    MsOffice = 3
    PHP = 4
    HTML = 5
