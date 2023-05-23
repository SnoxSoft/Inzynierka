import random
import re


pesel_regex = "^(?:(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1-2][0-9]|3[0-1]))|(?:[0-9]{2}(?:0[13-9]|1[0-2])(?:0[1-9]|[1-2][0-9]|30))|(?:[0-9]{2}02(?:0[1-9]|1[0-9]|2[0-8]))|(?:[0-9]{2}(?:02)(?:29)))(?:[0-9]{5})$"
def generate(amount):
    f = open("dane/pesel.txt", "a")
    for x in range(amount):
        while True:
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
                print(month_str)
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
            if re.match(pesel_regex, pesel):
                break
        f.write(pesel)
        f.write("\n")
    f.close()
    print("{} numerow PESEL wygenerowanych ktore sa zgodne z regexem w API".format(str(amount)))