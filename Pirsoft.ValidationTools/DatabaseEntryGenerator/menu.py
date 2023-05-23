import os
import password_generator
import pesel_generator
import bank_number_generator
import employee_generator
import start_date_generator


def clear_console():
    os.system('cls')


def main():
    while True:
        clear_console()
        print("PIRSOFT - generator danych pracownikow")
        print("Aby stworzyc pracownika musisz wpierw wygenerowac hasla, pesele oraz konta bankowe!\n")
        print("Wybierz opcje: ")
        print("1. Wygeneruj hasla")
        print("2. Wygeneruj numery PESEL")
        print("3. Wygeneruj numery kont bankowych")
        print("4. Wygeneruj daty startowe")
        print("9. Wygeneruj pracownika")
        print("0. Wylacz program :C")
        menu_input = input("\nPodaj numer wybranej opcji: ")
        print(menu_input)
        if menu_input == "1":
            clear_console()
            while True:
                password_generated_amount = input("Podaj liczbe hasel do wygenerowania: ")
                if password_generated_amount is not None:
                    break
            password_generator.generate(int(password_generated_amount))
            input("Nacisnij dowolna litere aby kontynuowac...")
        elif menu_input == "2":
            clear_console()
            while True:
                pesel_generated_amount = input("Podaj liczbe numerow PESEL do wygenerowania: ")
                if pesel_generated_amount is not None:
                    break
            pesel_generator.generate(int(pesel_generated_amount))
            input("Nacisnij dowolna litere aby kontynuowac...")
        elif menu_input == "3":
            clear_console()
            while True:
                bank_generated_amount = input("Podaj liczbe numerow kont bankowych do wygenerowania: ")
                if bank_generated_amount is not None:
                    break
            bank_number_generator.generate(int(bank_generated_amount))
            input("Nacisnij dowolna litere aby kontynuowac...")
        elif menu_input == "4":
            clear_console()
            while True:
                date_generated_amount = input("Podaj liczbe numerow dat startowych do wygenerowania: ")
                if date_generated_amount is not None:
                    break
            start_date_generator.generate(int(date_generated_amount))
            input("Nacisnij dowolna litere aby kontynuowac...")
        elif menu_input == "9":
            clear_console()
            employee_generator.generate()
            input("Nacisnij dowolna litere aby kontynuowac...")
        elif menu_input == "0":
            break


if __name__ == "__main__":
    main()
