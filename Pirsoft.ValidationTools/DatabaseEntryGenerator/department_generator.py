import numpy as np
import random


def generate(amount):
    department_list = []
    for x in range(amount):
        with open("dane/zwierzeta.txt", "r", encoding="utf-8") as file:
            zwierzeta_array = np.array([line.rstrip() for line in file])
        random_department_number = random.randint(0, len(zwierzeta_array)-1)
        department_list.append(zwierzeta_array[random_department_number])
    f = open("wynik/departments.txt", "w", encoding="utf-8")
    f.write("insert into pirsoft.departments(department_name) values \n")
    counter = 0
    for department in department_list:
        counter = counter + 1
        f.write("(")
        f.write('\"'+department+'\"')
        if counter == len(department_list):
            f.write(")")
        else:
            f.write("),\n")
    f.close()
    print("Wygenerowano {} departamentow".format(str(amount)))
