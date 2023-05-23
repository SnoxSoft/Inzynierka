from enum import Enum


class SeniorityLevel(Enum):
    Inny = 1
    Junior = 2
    Mid = 3
    Senior = 4


class CompanyRoles(Enum):
    Kadry = 1
    Kierownik = 2
    Ksiegowosc = 3
    Pracownik = 4
    Prezes = 5
    Zarzad = 6


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
