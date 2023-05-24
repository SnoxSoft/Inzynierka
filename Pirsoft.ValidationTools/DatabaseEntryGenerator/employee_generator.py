import dane.enums as enums
import os
import numpy as np
import random
from helper_functions import removeAccents

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
                 bank_account_number, seniority_in_month, employment_start_date,
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
        employee_role_name = ""
        for e in enums.CompanyRoles:
            if e.value == int(employee_role):
                employee_role_name = e.name

        with open("dane/imiona_polskie.txt", "r", encoding="utf-8") as file:
            imiona_array = np.array([line.rstrip() for line in file])

        with open("dane/nazwiska.txt", "r", encoding="utf-8") as file:
            nazwiska_array = np.array([line.rstrip() for line in file])

        with open("dane/pesel.txt", "r", encoding="utf-8") as file:
            pesel_array = np.array([line.rstrip() for line in file])

        with open("dane/bank_nr.txt", "r", encoding="utf-8") as file:
            bank_nr_array = np.array([line.rstrip() for line in file])

        with open("dane/haslo.txt", "r", encoding="utf-8") as file:
            haslo_array = np.array([line.rstrip() for line in file])

        with open("dane/start_date.txt", "r", encoding="utf-8") as file:
            start_date_array = np.array([line.rstrip() for line in file])

        seniority_array = np.array([seniority.value for seniority in enums.SeniorityLevel])
        contract_type_array = np.array([contract.value for contract in enums.ContractTypes])

        employee_list = []
        for i in range(int(employee_count)):
            imie = imiona_array[random.randint(0, len(imiona_array)-1)]
            nazwisko = nazwiska_array[random.randint(0, len(nazwiska_array)-1)]
            email = removeAccents(imie) + "." + removeAccents(nazwisko) + "@pirsoft.com"
            pesel = pesel_array[random.randint(0, len(pesel_array)-1)]
            data_urodzenia = date_of_birth_from_pesel(pesel)
            bank_nr = bank_nr_array[random.randint(0, len(bank_nr_array)-1)]
            haslo = haslo_array[random.randint(0, len(haslo_array)-1)]
            start_date = start_date_array[random.randint(0, len(start_date_array)-1)]
            seniority_id = seniority_array[random.randint(0, len(seniority_array)-1)]
            contract_type_id = contract_type_array[random.randint(0, len(contract_type_array)-1)]
            department_id = random.randint(1, 10)
            seniority_threshold = random.randint(0, 1)
            if seniority_threshold == 0:
                leave_base_days = 20
            else:
                leave_base_days = 26
            leave_demand_days = 4
            salary = random.randint(3000, 15000)
            password_reset = 0
            is_active = 1
            seniority_in_months = random.randint(1, 30)

            employee_list.append(Employee(
                first_name=imie,
                last_name=nazwisko,
                email_address=email,
                password=haslo,
                pesel=pesel,
                bank_account_number=bank_nr,
                seniority_in_month=seniority_in_months,
                employment_start_date=start_date,
                is_active=is_active,
                password_reset=password_reset,
                birth_date=data_urodzenia,
                salary_gross=salary,
                leave_base_days=leave_base_days,
                leave_demand_days=leave_demand_days,
                leave_is_seniority_threshold=seniority_threshold,
                employee_contract_type_id=contract_type_id,
                employee_department_id=department_id,
                employee_seniority_level_id=seniority_id,
                employee_company_role_id=employee_role
            ))

        f = open("wynik/employee_{}".format(employee_role_name), "w", encoding="utf-8")
        f.write('insert into pirsoft.employees(first_name, last_name, email_address, password, pesel, bank_account_number, seniority_in_months, employment_start_date,is_active, password_reset, birth_date, salary_gross, leave_base_days,leave_demand_days, leave_is_seniority_threshold, employee_contract_type_id,employee_department_id, employee_seniority_level_id, employee_company_role_id) values\n')
        counter = 0
        for e in employee_list:
            counter = counter+1
            f.write("(")
            f.write('\"' + e.first_name + '\"' + ", ")
            f.write('\"' + e.last_name + '\"' + ", ")
            f.write('\"' + e.email_address + '\"' + ", ")
            f.write('\"' + e.password + '\"' + ", ")
            f.write('\"' + e.pesel + '\"' + ", ")
            f.write('\"' + e.bank_account_number + '\"' + ", ")
            f.write(str(e.seniority_in_month) + ", ")
            f.write('\"' + e.employment_start_date + '\"' + ", ")
            f.write(str(e.is_active) + ", ")
            f.write(str(e.password_reset) + ", ")
            f.write('\"' + e.birth_date + '\"' + ", ")
            f.write(str(e.salary_gross) + ", ")
            f.write(str(e.leave_base_days) + ", ")
            f.write(str(e.leave_demand_days) + ", ")
            f.write(str(e.leave_is_seniority_threshold) + ", ")
            f.write(str(e.employee_contract_type_id) + ", ")
            f.write(str(e.employee_department_id) + ", ")
            f.write(str(e.employee_seniority_level_id) + ", ")
            f.write(str(e.employee_company_role_id))
            if counter == len(employee_list):
                f.write(")")
            else:
                f.write("),\n")
        f.close()

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
