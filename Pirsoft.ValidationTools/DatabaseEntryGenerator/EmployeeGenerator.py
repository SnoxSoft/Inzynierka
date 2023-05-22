"""
id ok
firstName ok
lastName ok
email ok
password ok
accountTypeId ok
pesel ok
bankAccountNumber
departamentId
seniorityInMonths
employmentStartDate
isActive
passwordReset
dateOfBirth
grossSalary
contractTypeId
positionId
"""
import random
import numpy as np
from schwifty import IBAN

def password_generator():
    uppercase_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    lowercase_letters = uppercase_letters.lower()
    digits = "0123456789"
    symbols = ",./;'[]{}()*&%$#@!\\?-+_ "

    all = uppercase_letters + lowercase_letters + digits + symbols

    amount = 1000000
    f = open("dane/haslo.txt", "a")
    for x in range(amount):
        length_password = random.randrange(8, 12)
        password = "".join(random.sample(all, length_password))
        f.write(password)
        f.write("\n")
    f.close()

password_generator()
print('Password generated')

def pesel_generator():
    weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 7]
    year = random.randint(1900, 2004)
    month = random.randint(1, 12)

    if month == 2:
        if year % 4 == 0:
            day = random.randint(1, 29)
        else:
            day = random.randint(1, 28)
    else:
        if month % 2 == 0:
            day = random.randint(1, 30)
        else:
            day = random.randint(1, 31)
    gender = str(random.randint(0, 9999)).zfill(4)

    year_str = str(year)[-2:]
    month_str = ""
    if year < 2000:
        month_str = str(month)
        if month < 10:
            month_str = '0' + str(month)
    else:
        month_str = str(month + 20)

    month_str = str(month)
    if month < 10:
        month_str = '0' + str(month)

    day_str = str(day)
    if day < 10:
        day_str = '0' + str(day)

    pesel = year_str + month_str + day_str + gender
    checksum = sum([int(pesel[i]) * weights[i] for i in range(10)]) % 10
    if checksum != 0:
        checksum = 10 - checksum
    pesel += str(checksum)

    f = open("dane/pesel.txt", "a")
    f.write(pesel)
    f.write("\n")
    f.close()

for i in range(100000):
  pesel_generator()
print("PESEL generated")

def bank_number_generator():
    weights = [3, 9, 7, 1, 3, 9, 7]
    with open("dane/banki.txt", "r") as file:
        lines = file.readlines()
    bank_array = np.array([int(line) for line in lines])
    rand_bank_array = random.randint(1, 29)
    #print(rand_bank_array)
    rand_domestic_code = random.randint(0, 999)
    rand_domestic_code = str(rand_domestic_code).zfill(3)
    #print(rand_domestic_code)
    bank_num = f'{bank_array[rand_bank_array]}{rand_domestic_code}'
    #print(bank_num)
    bank_checksum = sum([int(bank_num[i]) * weights[i] for i in range(7)]) % 10
    if bank_checksum != 0:
        bank_checksum = 10 - bank_checksum
    bank_num = f'{bank_num}{bank_checksum}'
    #print(bank_num)
    rand_acc_num = random.randint(0, 9999999999999999)
    rand_acc_num = str(rand_acc_num).zfill(16)
    #print(rand_acc_num)
    iban = IBAN.generate('PL', bank_num, str(rand_acc_num))

    f = open("dane/bank_nr.txt", "a")
    f.write(str(iban)[2:])
    f.write("\n")
    f.close()

for i in range(100000):
    bank_number_generator()
print("Bank account numbers generated")
