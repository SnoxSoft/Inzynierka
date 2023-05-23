import pandas as pd
import random


def generate(amount):
    f = open("dane/start_date.txt", "a")
    datelist = pd.date_range(start="2020-01-01", end="2023-04-01")
    for x in range(amount):
        random_date_number = random.randint(0, 1187)
        f.write(str(datelist[random_date_number].strftime('%Y-%m-%d')))
        f.write("\n")
    f.close()
    print("{} dat startowych zostalo wygenerowanych".format(str(amount)))
