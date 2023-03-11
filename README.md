# Update bazy danych do developmentu
Przy każdej zmianie wprowadzonej do bazy danych należy zaktualizować plik `..\pirsoft.sql` i dodać go do swojego PR (jeśli jakiś mamy otwarty), ablo utworzyć nowy PR nawet jeśli nie dotyczy kodu.
## Export zmodyfikowanej bazy danych
- Uruchamiamy usługi (Win + r > services.msc), sprawdzamy czy MySQL80 (albo podobnie) jest uruchomiony,
- MySql Workbench:
> łączymy z serwerem, po połączeniu, w menu na górze programu:  
> Server -> Data Export:  
> - zaznaczamy pirsoft na liście
> - w dolnej części, zaznaczamy `Export to Self-Contained File`
> - jeśli w kolejnych krokach będzie krzyczeć, że chce nadpisać, to mu pozwolić, kliknąć `Tak` czy `Yes` czy `Overwrite`
> - podajemy ścieżkę do pliku w repo, np.: `C:\Users\exampleUser\Documents\PirsoftRepo\pirsoft.sql`
> - reszta checkboxów ma być pusta
> - klikamy `Start Export`
## Import zaktualizowanej bazy danych
- Uruchamiamy usługi (Win + r > services.msc), sprawdzamy czy MySQL80 (albo podobnie) jest uruchomiony,
- MySql Workbench:
> łączymy z serwerem, po połączeniu, po lewej, na liście dostępnych baz:  
> - *gdy w kolejnym kroku wyskoczy okienko, klikamy* `Drop Now`
> - klikamy prawym na `pirsoft` i wybieramy `Drop Schema...`, baza znika z listy po lewej  
>
> w menu na górze programu: -> Server -> Data Import:
> - zaznaczamy `Import from Self-Contained File`
> - podajemy ścieżkę do pliku w repo, np.: `C:\Users\exampleUser\Documents\PirsoftRepo\pirsoft.sql` lub swojego lokalnego exportu
> - *w następnym kroku **WIELKOŚĆ LITER MA ZNACZENIE**, podajemy dokładnie nazwę* `pirsoft`
> - kawałek po prawej, klikamy przycisk `New...` i podajemy nazwę `pirsoft`
> - klikamy `Start Import`  
> - zamykamy zakładkę `Administration - Data Import/Res...`
> - na liście po lewej, klikamy dwie małe strzałeczki `odśwież`
> - baza pojawia się na liście