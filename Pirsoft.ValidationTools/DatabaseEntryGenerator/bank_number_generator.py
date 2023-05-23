import numpy as np
import random
from schwifty import IBAN
import re

bank_regex = "^[0-9]+$"


def generate(amount):
    f = open("dane/bank_nr.txt", "a")
    for x in range(amount):
        while True:
            weights = [3, 9, 7, 1, 3, 9, 7]
            with open("dane/banki.txt", "r") as file:
                lines = file.readlines()
            bank_array = np.array([int(line) for line in lines])
            rand_bank_array = random.randint(1, 29)
            rand_domestic_code = random.randint(0, 999)
            rand_domestic_code = str(rand_domestic_code).zfill(3)
            bank_num = f'{bank_array[rand_bank_array]}{rand_domestic_code}'
            bank_checksum = sum([int(bank_num[i]) * weights[i] for i in range(7)]) % 10
            if bank_checksum != 0:
                bank_checksum = 10 - bank_checksum
            bank_num = f'{bank_num}{bank_checksum}'
            rand_acc_num = random.randint(0, 9999999999999999)
            rand_acc_num = str(rand_acc_num).zfill(16)
            iban = IBAN.generate('PL', bank_num, str(rand_acc_num))
            bank_number = str(iban)[2:]
            if re.match(bank_regex, bank_number):
                break
        f.write(bank_number)
        f.write("\n")
    f.close()
    print("{} numerow kont bankowych wygenerowanych ktore sa zgodne z regexem w API".format(str(amount)))