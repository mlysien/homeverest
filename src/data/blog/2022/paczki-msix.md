---
title: Paczki MSIX
author: Mateusz Łysień
pubDatetime: 2022-06-15
slug: paczki-msix
featured: false
draft: false
tags: [tools]
description:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut
---

Cześć! Dzisiejszy wpis będzie kolejnym z serii technicznych. Zacznę od takiej tezy, że w świecie IT istnieje mnóstwo firm, które dalej utrzymują aplikacje napisane jeszcze z użyciem Windows Forms czy WPF. Kiedyś sam pracowałem w takim projekcie i pamiętam, że wydawanie nowej wersji bywało dość karkołomne i bardzo czasochłonne. Obecnie utrzymuję [jedną aplikację WPF](https://homeverest.pl/realizacje/pokoj-wspomnien/), w której zastosowałem pakowanie aplikacji z użyciem MSIX i efekty są bardzo zadowalające. Aplikacja jest zainstalowana na kilkunastu stanowiskach i ręczna aktualizacja byłaby ogromnie trudna. Dlatego w tym wpisie zaprezentuję rozwiązanie dostarczone przez firmę Microsoft do pakowania aplikacji desktopowych w celu ich łatwiejszej instalacji oraz późniejszych aktualizacji, czyli paczki MSIX. Co jest warte szczególnej uwagi to fakt, że nie trzeba przebudowywać aktualnie istniejącej aplikacji, wystarczy dodać nowy projekt do solucji i sprawy związane z procesem publikacji mamy w zasadzie załatwione.

## Paczki MSIX - czym są?

![Budowa paczki MSIX.](/src/assets/blog/2022/paczki-msix/msixpackage.png)

Źródło: [Microsoft](https://docs.microsoft.com/en-us/windows/msix/overview)

MSIX to tak naprawdę format pakowania aplikacji dla systemu Windows. Dzięki MSIX możemy spakować zarówno aplikację napisaną w Windows Forms jak i w WPF czy nawet konsolową. Format ten gwarantuje że system Windows będzie w stanie zainstalować naszą aplikację, a później gdy pojawi się nowa wersja, sam ją pobrać i zainstalować. Paczka zbudowana jest w dość prosty sposób. Zawiera oczywiście pliki aplikacji - mowa tutaj o plikach zbudowanej aplikacji, nie kodach źródłowych. Paczka zawiera także kilka swoich własnych zależności takich jak informacje o uprawnieniach aplikacji, czyli z jakich zasobów systemu będzie korzystać, informacje o zasobach graficznych - czyli ikonki aplikacji w różnych wielkościach (np. kafelki w menu start), a także zawiera informacje o podpisie paczki, który jest wymagany aby system mógł ją zainstalować. Po lewej stronie znajduje się screen ze schematem budowy paczki MSIX. Paczki MSIX są instalowane przez specjalny instalator systemu Windows, dlatego nie trzeba dbać o zaprojektowanie własnego instalatora. Po zainstalowaniu aplikacji system sam dba o jej aktualizację, chyba, że w plikach konfiguracyjnych paczki zmienimy te ustawienia na inne. Aby jeszcze lepiej zaprezentować czym są paczki MSIX, zachęcam do obejrzenia, krótkiej prezentacji na ten temat od Microsoftu. Paczki MSIX są dostępne tylko i wyłącznie na system Windows 10 i 11.

https://www.youtube.com/watch?v=phrD081sMWc

## Paczki MSIX - praktyczne zastosowanie

We wstępie zaznaczyłem, że korzystanie z paczek MSIX w projektach nie wymaga gruntownej przebudowy solucji, to prawda! Całym procesem instalacji i aktualizacji zajmuje się system Windows. Od strony dostawcy oprogramowania wystarczy tylko utworzyć paczkę instalacyjną. A jak to zrobić pokażę na przykładzie prostej aplikacji desktopowej.

### Utworzenie solucji

Uruchamiamy Visual Studio i tworzymy nowy projekt wybierając typ aplikacji WPF:

![](/src/assets/blog/2022/paczki-msix/image-3.png)

Dodajemy jakiś napis na ekranie głównym, to tylko prosta aplikacja, która ma na celu pokazanie działania paczek MSIX, więc nie musi mieć żadnych wodotrysków. Po uruchomieniu aplikacja powinna wyglądać w taki sposób:

![](/src/assets/blog/2022/paczki-msix/image-2.png)

### Dodanie projektu MSIX Packaging

Do istniejącej solucji dodajemy nowy projekt, w wyszukiwarce szablonów projektów należy wpisać "windows application packaging":

![](/src/assets/blog/2022/paczki-msix/image.png)

W tym momencie, zaczyna się już wstępna konfiguracja paczki instalacyjnej, należy wybrać wersję docelową i minimalną wersji systemu Windows jaka jest wspierana przez naszą aplikację:

![](/src/assets/blog/2022/paczki-msix/image-4.png)

W momencie, kiedy tworzymy komercyjne aplikacje, najlepiej dowiedzieć się od klienta na jakiej wersji systemu Windows aplikacja ma działać. Jeśli my decydujemy o specyfikacji najlepiej wybrać najnowszą wersję systemu. W ramach przykładu wybieram najnowszą wersję systemu Windows.

Dobrze, powiedzmy, że aplikacja jest już na tyle dobrze zaprojektowana i działająca, że możemy wysłać instalator dla naszego klienta. Jednak aby to zrobić musimy wykonać kilka kroków. Należy otworzyć plik **_Package.appxmanifest_** w projekcie naszego instalatora. Następnie trzeba podać informacje o naszej aplikacji z jakich będzie korzystał system operacyjny.

1. **Edycja informacji o aplikacji**

![](/src/assets/blog/2022/paczki-msix/image-6.png)

W tej zakładce mamy możliwość edycji informacji o naszej aplikacji, możemy tutaj zdefiniować jej nazwę wyświetlaną przez system operacyjny, jej opis, ustawienia regionalne, czy też orientacje w jakie będzie pracować aplikacja.

2. **Edycja zasobów graficznych aplikacji**

<figure>

![Zakładka edycji zasobów graficznych aplikacji.](/src/assets/blog/2022/paczki-msix/image-7.png)

<figcaption>

Zakładka edycji zasobów graficznych aplikacji.

</figcaption>

</figure>

W tej zakładce możemy dodać zasoby graficzne dla naszej aplikacji. Warto tutaj zwrócić uwagę na fakt, że mamy bardzo duże możliwości jeśli chodzi o dostosowanie grafik, ponieważ jak widać z lewej strony zakładki, można ustalać wygląd dla poszczególnych wielkości kafelków, które pojawią się w menu Start po zainstalowaniu aplikacji. Możliwości mamy sporo, ale nie trzeba ręcznie tworzyć grafik pod każdy rozmiar kafelka, możemy wykonać to automatycznie na podstawie głównej ikony aplikacji. Należy wybrać źródło (pole **_Source_**) naszej ikonki a następnie nacisnąć przycisk _**Generate**_ - spowoduje to utworzenie grafik dla wszystkich rozmiarów kafelków - jeśli chcemy wygenerować automatycznie grafiki tylko dla konkretnych typów i rozmiarów kafelków należy wybrać je z pól **_Assets_** i **_Scales_**.

3. **Edycja uprawnień aplikacji**

<figure>

![Zakładka edycji uprawnień aplikacji.](/src/assets/blog/2022/paczki-msix/image-8.png)

<figcaption>

Zakładka edycji uprawnień aplikacji.

</figcaption>

</figure>

W tej zakładce mamy możliwość zaznaczenia funkcjonalności systemu Windows do jakich nasza aplikacja będzie potrzebować dostępu - coś jak aplikacje, które mamy na telefonie, które również podczas instalacji wyświetlają listę funkcji systemu z których będą korzystać podczas działania. Warto poświęcić chwilę na zastanowienie się z jakich zasobów będzie korzystać nasza aplikacja, zanim wypuści się oficjalnego instalatora. Może okazać się później, że przez ominięcie którejś funkcjonalności aplikacja nie działa we właściwy sposób.

4. **Pakowanie aplikacji**

<figure>

![Zakładka edycji danych o paczce.](/src/assets/blog/2022/paczki-msix/image-9.png)

<figcaption>

Zakładka edycji danych o paczce.

</figcaption>

</figure>

Ostatnią i najważniejszą zakładką jest zakładka z danymi o paczce. Podajemy w niej informacje na temat paczki jaka zostanie stworzona a następnie wysłana do klienta, czyli informacje o nazwie, o wersji paczki, a także o wydawcy. Na wydawcy chciałbym się teraz bardziej skupić, gdyż jest to kluczowa właściwość w tworzonej paczce. Nazwę wydawcy podajemy dowolną - zwykle będzie to nazwa firmy tworzącej oprogramowanie. Jednak aby oprogramowanie, które wyślemy do klienta w paczce było możliwe do zainstalowania, system Windows musi wiedzieć, że paczka pochodzi od zaufanego wydawcy. Do tego celu używa się certyfikatów, które można podpiąć do paczki - w tym celu należy nacisnąć przycisk _**Choose Certificate...**_, a następnie w okienku wybrać certyfikat.

<figure>

![](/src/assets/blog/2022/paczki-msix/image-10.png)

<figcaption>

Okno wyboru certyfikatu.

</figcaption>

</figure>

Oczywiście nie mając certyfikatu również jest możliwość spakowania naszej aplikacji. Wystarczy w oknie wyboru certyfikatu kliknąć przycisk **_Create..._**, a następnie podać wymagane dane. Należy pamiętać, że taki certyfikat jest tzw. certyfikatem z podpisem własnym, czyli użytkownik końcowy, chcąc zainstalować naszą aplikację najpierw będzie musiał zainstalować nasz certyfikat w swoim systemie.

<figure>

![](/src/assets/blog/2022/paczki-msix/image-11.png)

<figcaption>

Okno kreatora certyfikatu.

</figcaption>

</figure>

## Paczki MSIX - jak publikować?

Mając uzupełnione wszystkie informacje o naszej paczce, możemy ją opublikować. W tym celu należy zacząć od wskazania, projektu jaki będzie zawierała publikowana paczka. Należy po prostu dodać referencję do projektu, który jest naszą właściwą aplikacją. Jeśli solucja buduje się prawidłowo można rozpocząć właściwy proces publikacji. Ja w tym wpisie przedstawiam jak utworzyć paczki do ręcznej instalacji przez klienta, zaznaczę tutaj tylko, że jest możliwość publikowania aplikacji bezpośrednio do Windows Store.

Publikowanie aplikacji posiada swój własny kreator, aby go uruchomić należy kliknąć **PPM** na nazwie projektu z naszą paczką MSIX i wybrać opcję **_Publish_ >> _Create App Packages..._**

<figure>

![Pierwszy krok kreatora tworzącego paczki.](/src/assets/blog/2022/paczki-msix/image-12.png)

<figcaption>

Pierwszy krok kreatora tworzącego paczki.

</figcaption>

</figure>

Tak jak wcześniej wspomniałem, publikacje aplikacji jaką tutaj przedstawiam - ale też sam stosuje w swoim projekcie - wykonuję przy użyciu tzw. _**Sideloadingu**_ \- czyli sam przechowuję paczki aplikacji na swoim serwerze, z którego potem również zaciągane są nowsze wersje. Ważną sprawą w tym kroku jest checkbox z aktualizacjami - jeśli chcemy, aby system operacyjny instalował nam aktualizacje aplikacji, należy mieć go zaznaczonego.

<figure>

![Drugi krok kreatora - podpisywanie paczki.](/src/assets/blog/2022/paczki-msix/image-13.png)

<figcaption>

Drugi krok kreatora - podpisywanie paczki.

</figcaption>

</figure>

Na kolejnym kroku wyświetlają się informacje o aktualnie wybranym certyfikacie - to ten sam, który dodaliśmy/utworzyliśmy w momencie podawania informacji o podpisie paczki.

<figure>

![Trzeci krok kreatora - konfiguracja paczki.](/src/assets/blog/2022/paczki-msix/image-16.png)

<figcaption>

Trzeci krok kreatora - konfiguracja paczki.

</figcaption>

</figure>

W trzecim kroku kreatora ustalamy numer wersji, choć w domyśle zmienia się on automatycznie, każdorazowo po opublikowaniu paczki. Mamy również możliwość wybrania architektury procesora, który wspierany jest przez naszą aplikację. Warto na tym kroku wybrać konfigurację Release dla danej architektury procesora.

<figure>

![Czwarty krok instalatora - określenie ścieżki do aktualizacji.](/src/assets/blog/2022/paczki-msix/image-18.png)

<figcaption>

Czwarty krok instalatora - określenie ścieżki do aktualizacji.

</figcaption>

</figure>

Czwarty krok instalatora jest bardzo istotny - tutaj podajemy lokalizację paczki - zwykle jeśli chcemy zagwarantować ciągłą aktualizację naszej aplikacji należy podać ścieżkę do katalogu do którego dostęp będą mieli wszyscy klienci korzystający z aplikacji, czyli najwygodniej podać jakiś katalog FTP. Jeśli tworzymy aplikację wewnętrzną to możemy podać jakiś katalog na dysku sieciowym do którego dostęp mają inne stacje, na których zainstalowana jest nasza aplikacja. Dla przykładu podałem ścieżkę na moim lokalnym komputerze, po to aby w następnym podrozdziale przedstawić proces wydawania nowej wersji aplikacji.

<figure>

![](/src/assets/blog/2022/paczki-msix/image-19.png)

<figcaption>

Strona domowa aplikacji.

</figcaption>

</figure>

Po wygenerowaniu plików paczki i skopiowaniu ich do katalogu, gdzie powinien się znaleźć instalator, możemy otworzyć plik _index.html,_ ujrzymy wtedy stronę domową aplikacji. Można stąd w wygodny sposób ją zainstalować - strona jest zintegrowana z systemowym instalatorem, dlatego po kliknięciu na przycisk **_Get the app_,** otworzy się systemowy instalator, który zainstaluje naszą aplikację.

Ważna informacja - wspominałem wcześniej, żeby zainstalować naszą aplikację musimy posiadać na komputerze docelowym właściwy certyfikat - można go pobrać z rozwijanego menu po lewej stronie pod linkiem **_Publisher Certificate_**, a następnie zainstalować w naszym systemie. Po zainstalowaniu nasza aplikacja powinna się od razu uruchomić a jej skrót zostanie dodany do menu start.

## Paczki MSIX - aktualizacja aplikacji

Aplikacja zainstalowana na komputerze klienta, a co jeśli nagle pojawi się jakiś bug lub trzeba dodać nową funkcjonalność? Wtedy należy wgrać nową wersję aplikacji. Z mojego doświadczenia wiem, że ta kwestia jest najbardziej problematyczna, zwykle jest to żmudny proces łączenia się przez RDP lub wchodzenie na serwery FTP w celu podmienienia plików aplikacji. Najgorzej, jeśli aplikacja jest używana przez kilku klientów, wtedy taki proces należy powtórzyć dla każdego klienta.

Korzystając z paczek MSIX nie musimy się o to martwić. W naszej przykładowej aplikacji zróbmy jakąś zmianę, dowolną, może być dodatkowy przycisk pod napisem. Jak już będziemy gotowi - czyli sprawdzimy, że przycisk się wyświetla możemy wykonać aktualizację.

Robimy to dokładnie jak w poprzednim podrozdziale, dlatego nie będę się tutaj powtarzał, uruchamiamy kreator i postępujemy zgodnie z kolejnymi krokami. Jedną z rzeczy na jaką należy zwrócić uwagę to numerek wersji, mając zaznaczony checkbox o automatycznej inkrementacji wersji, po każdej publikacji nasza wersja aplikacji będzie się zwiększać, dzięki czemu system będzie wiedział, że w lokalizacji z instalatorem (dysk sieciowy/serwer FTP) pojawiła się nowa wersja aplikacji. Jeśli zmiany w aplikacji są spore i potrzebujemy zmienić numerek major, to odznaczamy checkbox o automatycznej inkrementacji i ustawiamy własną wersję. Następna publikacja będzie inkrementowana od ustawionej właśnie wartości.

Po zakończeniu kreatora, należy skopiować pliki do docelowego katalogu. Na czwartym kroku kreatora widoczna była opcja co do ustawień automatycznych aktualizacji - domyślnie aplikacja aktualizuje się po uruchomieniu, czyli wtedy system sprawdzi czy pojawiła się nowa wersja, można też ustawić aby system to robił sam, np. codziennie.

Po uruchomieniu aplikacji system sprawdzi czy jest nowa wersja, w naszym katalogu docelowym pojawiły się nowe pliki, dlatego po zamknięciu aplikacji, gdy się przyjrzymy, w menu start, na ikonce naszej aplikacji pojawi się pasek postępu aktualizowania.

<figure>

![System aktualizuje naszą aplikację.](/src/assets/blog/2022/paczki-msix/image-20.png)

<figcaption>

System aktualizuje naszą aplikację.

</figcaption>

</figure>

Po uruchomieniu nasze zmiany, których dokonaliśmy w aplikacji będą widoczne.

<figure>

![](/src/assets/blog/2022/paczki-msix/image-21.png)

<figcaption>

Aplikacja po aktualizacji.

</figcaption>

</figure>

## Paczki MSIX - podsumowanie

No to chyba najdłuższy jak dotąd wpis, jednak mam nadzieje, że skoro doszedłeś do podsumowania to był dla Ciebie wartościowy. Przykładowa aplikacja, którą przedstawiłem w tym przykładzie prawdopodobnie nigdy nie byłaby publikowana dla klienta, aplikacje, które tworzą firmy informatyczne są wielkimi kombajnami.

To co według mnie jest najważniejsze w używaniu paczek MSIX jest to, że są one niezależne od reszty solucji. Jednym wymaganiem jest posiadanie systemu Windows 10 w określonej przez konfigurację wersji. System sam sobie radzi z instalacją i późniejszą aktualizacją, w naszej gestii pozostaje tylko dodać nowy projekt do solucji i odpowiednio go skonfigurować.

Sam proces wydawania aktualizacji z wykorzystaniem paczek MSIX może być jeszcze bardziej zautomatyzowany, gdy dodamy do tego platformę GitHub i jej akcje, przez które możemy automatycznie po zrobieniu Pull Requesta skopiować paczki z aktualną wersją aplikacji do odpowiednich katalogów. Więcej na ten temat [pisałem w tym wpisie](https://homeverest.pl/github-actions/).

Dziękuję za przeczytanie tego wpisu, jeśli masz jakieś pytania lub coś jest niejasne to napisz do mnie przez [formularz kontaktowy](https://homeverest.pl/kontakt/). Będzie mi też bardzo miło, jeśli podzielisz się tą wiedzą ze swoimi znajomymi, może znasz jakichś, którzy narzekają, że sporą część pracy poświęcają na robienie aktualizacji aplikacji w Windows Forms czy WPF. Ten artykuł może się im przydać. Dzięki i do zobaczenia w kolejnym wpisie!
