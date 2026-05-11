---
title: GitHub Actions
author: Mateusz Łysień
pubDatetime: 2022-05-16
slug: github-actions
featured: false
draft: false
tags: [github, ci/cd, tools]
description:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut
---

![banner](/src/assets/blog/2022/github-actions/github_actions_bg.png)

Cześć! Witam w kolejnym artykule, dziś przedstawię zagadnienie związane z GitHub Actions. Na początek opiszę co to właściwie jest a potem jak korzystać z GitHub Actions. Jeśli jeszcze nie słyszeliście o jednej z ciekawszych funkcjonalności serwisu GitHub to serdecznie zapraszam do zapoznania się z artykułem.

## GitHub actions - co to jest?

Na początku zacznijmy od wyjaśnienia co to właściwie jest GitHub Actions? Odpowiedzi na to pytanie szukać najlepiej u źródła, czyli na portalu znanemu każdemu programiście - [GitHub](https://github.com/). GitHub w 2018 roku udostępnił narzędzie dla programistów trzymających swoje projekty na ich platformie, które miało zautomatyzować proces deploymentu. Proces CI/CD który stał się standardem dla wielu firm pojawił się również na platformie GitHub.

GitHub Actions to narzędzie ułatwiające budowanie procesu CI/CD dla projektów, które mamy na tym portalu. Narzędzie to posiada bardzo duże możliwości customizacji i automatyzacji praktycznie ze wszystkimi innymi funkcjonalnościami znajdującymi się na platformie GitHub. Jako programiści nie musimy się martwić o infrastrukturę środowiska w której proces CI/CD będzie się wykonywał, gdyż tą infrastrukturę dostarcza platforma GitHub, przez co na developerach spoczywa tylko i wyłącznie wybranie środowiska uruchomieniowego oraz zbudowanie całego workflow.

### Podstawowe pojęcia

Aby w pełni zrozumieć GitHub Actions przyda się słowniczek pojęć o które opiera się budowanie własnego procesu CI/CD.

#### **Workflows**

Chyba ciężko będzie dosłownie przetłumaczyć na polski tą nazwę, to by było coś w stylu "przepływu pracy" lub może bardziej zaawansowanie "potoku zadań". W GitHub Actions, workflow to podstawowy element całego procesu, który automatycznie, zgodnie z wewnętrzną konfiguracją uruchamia kolejne joby. Konfiguracja workflows definiowana jest w plikach z rozszerzeniem **.**_yaml_ w katalogu repozytorium o nazwie _.github/workflows_. W repozytorium możemy mieć wiele workflows, np. do deployowania naszej aplikacji, czy też do odpalania testów. Uruchomienie konkretnego workflow zawsze wiąże się z wystąpieniem jakiegoś zdarzenia (eventu), np. utworzenie pull requesta, lub merge zmian do jakiejś gałęzi. Workflow również możemy uruchamiać zgodnie z ustalonym harmonogramem lub też ręcznie, jednak cała przyjemność z korzystania z GitHub Actions polega na tym, aby wszystko było zautomatyzowane.

#### Jobs

Czyli z angielskiego "zadania". Joby to elementarne składowe workflow, są to kolejne kroki, które zawierają akcje, które uruchamia się na zdefiniowanym środowisku uruchomieniowym. W pojedynczym workflow można zdefiniować wiele zdań do wykonania, z tym, że trzeba pamiętać tutaj o tym, że zdania te są wykonywane jeden po drugim i są od siebie zależne, czyli jeżeli w naszym workflow zdefiniujemy dwa joby - jeden do kompilacji aplikacji a drugi do uruchomienia testów, to w momencie gdy kompilacja zakończy się błędem, nasze testy się nie uruchomią.

#### Events

Kolejnym ważnym pojęciem są eventy, czyli z angielskiego zdarzenia. Zdarzeniem w rozumieniu GitHub Actions jest pewne działanie w repozytorium, które powoduje uruchomienie odpowiedniego workflow. Źródłem zdarzeń w GitHub Actions są np. utworzenie Pull Requesta, utworzenie nowego zadania (na GitHubie nazwa się to issue) lub nawet dodanie komentarza do PR. W momencie pojawienia się takiego zdarzenia uruchamiany jest workflow, który przypisany jest pod konkretne zdarzenie. Wymieniłem tylko kilka przykładowych zdarzeń pod które możemy podpiąć nasze workflows, jest ich zdecydowanie więcej, dlatego zachęcam do zapoznania się z ich listą w [dokumentacji GitHub Actions](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows).

#### Actions

Akcje. Są to specjalne aplikacje dedykowane na platformę GitHub Actions, które zawierają zwykle bardziej złożoną logikę biznesową, np. uwierzytelnienie do chmury lub też skopiowanie plików z jednej lokalizacji w inną (na serwer FTP). Akcje wykonywane są przez zadania jedne po drugim według konfiguracji workflow.

Bardzo ważną rzeczą jaką chcę tu podkreślić to fakt, że akcji nie musimy pisać ręcznie, czyli przykładowo, nie trzeba pisać klienta, który wrzuci nam pliki na serwer. Na platformie GitHub znajduje się bardzo przydany [marketplace](https://github.com/marketplace), gdzie znajdziemy mnóstwo gotowych rozwiązań do naszych zadań. Dla ambitnych zostawiam jednak link, gdzie znajdzie się opis [jak tworzyć własne akcje](https://docs.github.com/en/actions/creating-actions).

#### Runners

Środowisko uruchomieniowe naszego workflow. GitHub Actions posiada trzy środowiska z których możemy korzystać, jest to Ubuntu Linux, macOS oraz Microsoft Windows. Kiedy jakieś zdarzenie wywołuje uruchomienie naszego workflow, tworzona jest nowa wirtualna kopia środowiska uruchomieniowego. Istnieje również możliwość dodania własnej konfiguracji środowiska uruchomieniowego, jeżeli potrzeba specyficznej konfiguracji, osobiście nie miałem takiej potrzeby, jednak zainteresowanym podsyłam [link do dokumentacji](https://docs.github.com/en/actions/hosting-your-own-runners).

## GitHub actions - jak używać?

Po dawce teorii spójrzmy jak zacząć korzystać z GitHub actions. Najlepiej zobrazować sobie to na przykładzie. Przedstawię jeden z moich workflow, z którego korzystam do wykonywania aktualizacji plików aplikacji na serwerze FTP, po to aby aplikacja mogła się automatycznie aktualizować, gdy tylko pojawią się nowa wersja w katalogu FTP.

```yaml
name: 🚀 Release new version
on:
  push:
    branches:
      - dev
jobs:
  web-deploy:
    name: 🎉 Release
    runs-on: ubuntu-latest
    steps:
    - name: 🚚 Getting newest source code
      uses: actions/checkout@v2

    - name: 📂 File synchronization 
      uses: SamKirkland/FTP-Deploy-Action@4.1.0
      with:
        server: ${{ secrets.FTP_SERVER_URL }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        protocol: ${{ secrets.FTP_PROTOCOL }}
        port: ${{ secrets.FTP_PORT }}
        local-dir: ${{ secrets.FTP_LOCAL_DIR }}
        server-dir: ${{ secrets.FTP_SERVER_DIR }}
```

Workflow uruchamiane jest w środowisku Ubuntu Linux w najnowszej wersji. Eventem uruchamiającym workflow jest zdarzenie wrzucenia zmian do gałęzi dev, czyli po prostu merge**.** Workflow posiada jedno zadanie składające się z dwóch kroków - pobrania najnowszej wersji kodów źródłowych oraz wrzucenia ich na serwer FTP.

Zacznijmy od pobrania najnowszej wersji kodów źródłowych.

![image](/src/assets/blog/2022/github-actions/image.png)

Pojedynczy krok zadania rozpoczynamy od nazwy - jest ona przydatna w momencie kiedy uruchamiane jest workflow, wtedy możemy zobaczyć, która krok zadania jest aktualnie uruchamiany. Do nadania nazwy używamy parametru _name_. Parametr _uses_ określa akcję (aplikację) jaka ma się uruchomić w aktualnym kroku naszego zadania. W tym wypadku jest to _actions/checkout@v2_ \- domyślna aplikacja GitHub Actions, która pobiera nasz kod źródłowy do środowiska uruchomieniowego, aby kolejne akcje mogły na nim działać.

Kolejnym i ostatnim krokiem jest synchronizacja plików z serwerem FTP. Nie będę podawał tutaj szczegółów implementacyjnych projektu, napiszę tylko tyle, że proces aktualizacji aplikacji robiony jest poprzez tworzenie paczek instalacyjnych i wrzucanie ich do odpowiedniego katalogu FTP, skąd aplikacja pobiera najnowszą wersję - gdy na serwerze znajdzie się nowsza wersja niż aplikacja ma u siebie, po jej ponownym uruchomieniu nastąpi aktualizacja.

![image](/src/assets/blog/2022/github-actions/image-3.png)

Ten krok posiada niemal identyczną strukturę jak pierwszy z pobieraniem najnowszej wersji kodu źródłowego. Używana jest tutaj specjalna akcja - [FTP Deploy](https://github.com/marketplace/actions/ftp-deploy), która przenosi pliki z katalogu wskazanego przez parametr _local-dir_ do katalogu na serwerze FTP o ścieżce _server-dir_. Pozostałe parametry to dane do nawiązania połączenia z serwerem FTP.

Workflow uruchamia się automatycznie po wrzuceniu zmian do gałęzi _dev_. Rezultaty uruchomienia workflow można sprawdzić wchodzą w zakładkę _Actions_ w obrębie repozytorium na GitHub.

![image](/src/assets/blog/2022/github-actions/image-1.png)

## GitHub actions - ile kosztuje?

Widząc takie narzędzie z takimi możliwościami na myśl przychodzi pytanie ile to kosztuje? A odpowiedź jaka pewnie się nasuwa to sporo. Otóż tutaj mam bardzo dobrą informację, ponieważ z GitHub actions **można korzystać w zupełności za darmo o ile nasze repozytorium jest publiczne**. Jeśli chodzi o repozytorium prywatne (bo takie też można posiadać na GitHubie) to nałożone są ograniczenia czasowe na wykorzystywanie mocy obliczeniowej, jednak z mojego doświadczenia ciężko będzie je przekroczyć posiadając jeden czy dwa projekty wykorzystujące CI/CD. Obecnie jest to 2000 minut mocy obliczeniowej i 500 MB przestrzeni dyskowej na zasoby CI/CD **na miesiąc**. Aby zobaczyć bieżące limity na prywatne repozytoria podaje [link do strony](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions) gdzie to można sprawdzić.

## GitHub actions - podsumowanie

Dziękuję Ci, że dotrwałeś do końca, mam nadzieję, że się podobało! Jeśli tak było to zachęcam do podzielenia się artykułem ze swoimi znajomymi poprzez podesłanie im linku do niego.

GitHub Actions to świetne miejsce do rozpoczęcia swojej przygody z DevOps. Limity jakie są nałożone na prywatne repozytoria nie są przerażające i w zupełności powinny wystarczyć na początek. O publicznych już nie wspominam, bo tam możemy działać dowoli. Chcąc być programistą w pełni full-stackowym znajomości procesu CI/CD również się bardzo przydają - wiem to po swojej codziennej pracy. Narzędzia są różne, ale GitHub Actions jest świetnym miejscem na początek.

Pisząc ten artykuł przypomniało mi się jak wiele ciekawych funkcjonalności skrywa GitHub, więc pewnie to nie ostatni artykuł w takim stylu. Jeszcze raz dziękuję za poświęcony czas na przeczytania, będę się bardzo cieszył, jeżeli zaczniesz wykorzystywać GitHub Actions w swoich projektach. Do usłyszenia w kolejnym artykule!
