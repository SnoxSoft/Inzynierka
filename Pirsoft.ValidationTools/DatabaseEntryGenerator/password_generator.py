import random
import re

password_regex = "^(?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[!@#$%^*]+)[0-9A-Za-z!@#$%^*]{14,}$"


def generate(amount):
    uppercase_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    lowercase_letters = uppercase_letters.lower()
    digits = "0123456789"
    symbols = "!@#$%^*"

    all = uppercase_letters + lowercase_letters + digits + symbols

    f = open("dane/haslo.txt", "a")
    for x in range(amount):
        while True:
            length_password = random.randrange(14, 18)
            password = "".join(random.sample(all, length_password))
            if re.match(password_regex, password):
                break
        f.write(password)
        f.write("\n")
    f.close()
    print("{} hasel wygenerowanych ktore sa zgodne z regexem w API".format(str(amount)))