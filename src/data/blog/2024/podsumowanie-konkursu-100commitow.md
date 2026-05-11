---
title: Podsumowanie konkursu 100commitow
author: Mateusz Łysień
pubDatetime: 2024-06-13
slug: podsumowanie-konkursku-100commitow
featured: false
draft: false
tags: [100commitow]
description:
  Ponad 12k linii kodu. 403 commity. 15 gwiazdek. Tak właśnie powstawało narzędzie nad którym pracowałem - Integrify.
---

![banner](/src/assets/blog/2024/podsumowanie-konkursu-100commitow/ChatGPT-Image-Apr-18-2025-03_07_05-PM-1.png)

Nie sądziłem, że dotrwam do końca i będę miał przyjemność napisać coś o moim pojekcie konkursowym. Wow. Konkurs "100commitow" zakończony. 100 dni codziennego commitowania. Ponad 12k linii kodu. 403 commity. 15 gwiazdek. Tak właśnie powstawało narzędzie nad którym pracowałem - **[integrify](https://github.com/mlysien/integrify)**.

## Jakie były założenia?

Wróćmy do początku marca, kiedy prace nad integrify ruszyły. Oto co wtedy sobie założyłem. Swoją drogą pisałem o moich planach na projekt w [poprzednim wpisie](https://www.homeverest.pl/100commitow-pierwszy-miesiac/).

**Kluczowe założenia:**

- synchronizacja klientów 
- synchronizacja zamówień
- synchronizacja produktów
- synchronizacja stanów magazynowych
- tworzenie dokumentów (paragony/faktury)
- ustawianie kierunku synchronizacji (ERP <-> Sklep)
- plugin do obsługi systemu ERP
- plugin do obsługi systemu e-commerce

**Dodatkowe założenia:**

- CLI do zarządzania procesami synchronizacji
- Wizualizacja procesu synchronizacji

**Założenia co do architektury:**

- Modularny monolit

## Co udało się skończyć?

Po stu dniach codziennego commitowania muszę stwierdzić, że lwia część założeń została wykonana. Fajnie. Synchronizacja wszystkich obszarów została zakończona. Działa ona w oparciu o dwa pluginy (do systemu ERP i systemu e-commerce). Co prawda wtyczki zwracają dane w o oparciu o generator, ale to pozwala na wykonanie procesów integracji we wszystkich obszarach. Kierunek integracji został ustalony również na podstawie podpiętych wtyczek, a raczej adapterów, które dostarczają dane na porty wykorzystywane w obszarach integracji.

Powstała dokumentacja z wykorzystaniem narzędzia **starlight**, która jest hostowana na GitHub Pages w repozytorium. Powstała ona, ponieważ chciałem, aby to narzędzie stało się takim szablonem pod własne integracje. Ciężko napisać uniwersalne pluginy i zamodelować procesy integracji dospasowane do wszystkich wymagań, dlatego powstała dokumentacja, aby można było samodzielnie robudować integrify.

Wykorzystałem ostatecznie architekturę heksagonalną. W pewnym momencie przy projektowaniu pluginów, sama mi się w pewnym sensie "objawiła", zauważyłem, że zaczynam potrzebować czegoś w rodzaju portów, a pluginy byłby ich adapterami. Stąd przesiadka z modularnego monolitu na heksagonala. Tak teraz prezentuje się architektura aplikacji:

![architektura](/src/assets/blog/2024/podsumowanie-konkursu-100commitow/image-1.png)

Powstało również CLI, dzięki któremu można zarządzać procesami integracji w wybranych obszarach. Na koniec udało mi się wypuścić wersję demonstracyjną z wcześniej wspomnianymi dwoma wtyczkami. Poniżej nagranie z działania CLI:

![demo](/src/assets/blog/2024/podsumowanie-konkursu-100commitow/integrify.demo_.gif)

## Czego nie udało się skończyć?

Są również założenia, których nie udało mi się kończyć. Na pewno są to dokumenty, które mogłyby powstawać podczas procesu integracji np. zamówień - myślę tutaj o fakturach czy paragonach.

Zabrakło czasu również na zaimplementowanie realnej integracji. Po głowie chodziła mi integracja między Subiektem GT a sklepem Shopify. W sumie to dalej mi chodzi. Jednak w trakcie trwania konkursu wiedziałem, że jak siądę do pisania adaptera na Subiekta to nic nie dowiozę w głównej aplikacji. Dodatkowo nikt by tego nawet nie sprawdził, bo trzeba byłoby stawiać lokalnie Subiekta oraz podpinać się pod Shopify.

## Czego się nauczyłem?

Byłoby głupio, gdyby po 100 dniach pracy nad projektem nic by mi nie zostało. Nie napiszę, że to 100 dni zmieniło moje życie, czy karierę zawodową. Jednak zdobyłem sporo doświadczenia.  

**Rutyna** - zacznę od tego, bo w teorii powinienem wyrobić sobie nawyk. Prawda jest taka, że gdyby nie przypomnienia oraz dostęp do aplikacji GitHub na telefonie to odpadłbym po pierwszym miesiącu. Praca nad projektem w weekendy totalnie odpadała. W święta/majówkę również. Projekt realizowałem głównie w tygodniu, wieczorkiem, starając się przynajmniej godzinkę czasu spędzić nad rozwijaniem go.

**Architektura** \- może nie koniecznie poznałem tajniki i piękno jakiegoś podejścia architektonicznego, ale na pewno zrozumiałem, że nie można się fixować na jednej architekturze. Przejechałem się w ten sposób na modularnym monolicie, w którym bardzo chciałem coś napisać. Jednak z biegiem czasu zauważyłem, że jednak bardziej by mi pasowała architektura heksagonalna, no i tydzień spędziłem na poprawianiu.

**_"done is better than perfect"_** - kołczingowe stwierdzenie ale przy pracy nad projektem, który ma działać jest bardzo trafne. Pamiętam taki okres, w którym zastanawiałem się nad podejściem do problemu z pluginami i z kontraktem danych do integracji. Updatowałem wtedy tylko readme i głowiłem się jak utworzyć abstrakcje, które będą jak najbardziej elastyczne i dopasowane do wszystkiego. No i w końcu musiałem pójść na jakieś kompromisy, aby móc dowieźć działającą aplikację a nie tylko idealnie zaprojektowaną.

**Nowe narzędzia** - głównie do tworzenia dokumentacji ([gitbook](https://www.gitbook.com/), [astro-starlight](https://starlight.astro.build/)). Dowiedziałem się jak hostować dokumentacje przy użyciu GitHub Pages oraz poznałem nowe GitHub-owe workflow do tego.

## Co dalej z integrify?

Chciałbym kontynuować prace nad projektem. Oczywiście już nie w tak absorbujący sposób jak podczas konkursu. Przede wszystkim chciałbym wykonać realną integrację pomiędzy sklepem a systemem ERP. Chciałbym utworzyć wtyczki do sklepu Shopify oraz systemu ERP jakim jest Subiekt GT. Możliwe, że kiedyś jeszcze jakieś inne wtyczki powstaną. Na pewno będę również aktualizował samą warstwę obszarów integracji, a wraz z nią dokumentację.

* * *

Dzięki za uwagę, jeśli masz jakieś pytania odnośnie projektu czy czegokolwiek innego to zapraszam do kontaktu. Jeśli chciałbyś pomóc rozwijać narzędzie lub z niego skorzystać to wbijaj na [GitHuba projektu](https://github.com/mlysien/integrify). A jak chcesz do mnie napisać to możesz to zrobić przez [formularz kontaktowy](https://homeverest.pl/kontakt/). Do następnego!

![gif](/src/assets/blog/2024/podsumowanie-konkursu-100commitow/goodbye-homer.gif)
