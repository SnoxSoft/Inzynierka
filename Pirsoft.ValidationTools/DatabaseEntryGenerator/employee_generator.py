import dane.enums as enums
import os
import numpy as np

def clear_console():
    os.system('cls')


def date_of_birth_from_pesel(pesel):
    if int(pesel[2:4]) < 20:
        dob = "19" + pesel[:2] + "-" + pesel[2:4] + "-" + pesel[4:6]
    else:
        peselList = list(pesel)
        if peselList[2] == "2":
            peselList[2] = "0"
        else:
            peselList[2] = "1"
        pesel = ''.join(peselList)
        dob = "20" + pesel[:2] + "-" + pesel[2:4] + "-" + pesel[4:6]
    return dob


class Employee:
    def __init__(self, first_name, last_name, email_address, password, pesel,
                 bank_account_number, avatar_file_path, seniority_in_month, employment_start_date,
                 is_active, password_reset, birth_date, salary_gross, leave_base_days,
                 leave_demand_days, leave_is_seniority_threshold, employee_contract_type_id,
                 employee_department_id, employee_seniority_level_id, employee_company_role_id):
        self.employee_company_role_id = employee_company_role_id
        self.employee_seniority_level_id = employee_seniority_level_id
        self.employee_department_id = employee_department_id
        self.employee_contract_type_id = employee_contract_type_id
        self.leave_is_seniority_threshold = leave_is_seniority_threshold
        self.leave_demand_days = leave_demand_days
        self.leave_base_days = leave_base_days
        self.salary_gross = salary_gross
        self.birth_date = birth_date
        self.password_reset = password_reset
        self.is_active = is_active
        self.employment_start_date = employment_start_date
        self.seniority_in_month = seniority_in_month
        self.avatar_file_path = avatar_file_path
        self.bank_account_number = bank_account_number
        self.pesel = pesel
        self.password = password
        self.email_address = email_address
        self.first_name = first_name
        self.last_name = last_name


def generate():
    if checkPrerequisites():
        employee_count = input("Podaj liczbe pracownikow do wygenerowania: ")
        clear_console()
        for e in enums.CompanyRoles:
            print(e.name + " - " + str(e.value))
        employee_role = input("Podaj id roli pracownikow do wygenerowania - reszta danych zostanie dostosowana losowo: ")

        with open("dane/imiona_polskie.txt", "r", encoding="utf-8") as file:
            lines = file.readlines()
        imiona_array = np.array(line for line in lines)

        with open("dane/nazwiska.txt", "r", encoding="utf-8") as file:
            lines = file.readlines()
        nazwiska_array = np.array(line for line in lines)

        with open("dane/pesel.txt", "r", encoding="utf-8") as file:
            lines = file.readlines()
        pesel_array = np.array(line for line in lines)

        with open("dane/bank_nr.txt", "r", encoding="utf-8") as file:
            lines = file.readlines()
        bank_nr_array = np.array(line for line in lines)

        with open("dane/haslo.txt", "r", encoding="utf-8") as file:
            lines = file.readlines()
        haslo_array = np.array(line for line in lines)

        seniority_array = np.array(seniority.value for seniority in enums.SeniorityLevel)
        contract_type_array = np.array(contract.value for contract in enums.ContractTypes)


        for i in range(int(employee_count)):
            print("mlem")

    else:
        print("Wygeneruj wszystkie podstawowe dane aby wygenerowac pracownikow!")


def checkPrerequisites():
    missing = 0

    if not os.path.isfile("dane/pesel.txt"):
        print("Brak wygenerowanych numerow PESEL!")
        missing = 1
    if not os.path.isfile("dane/haslo.txt"):
        print("Brak wygenerowanych hasel!")
        missing = 1
    if not os.path.isfile("dane/bank_nr.txt"):
        print("Brak wygenerowanych numerow kont bankowych!")
        missing = 1
    if missing == 1:
        return False
    return True
