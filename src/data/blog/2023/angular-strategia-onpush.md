---
title: Angular - strategia OnPush
author: Mateusz Łysień
pubDatetime: 2023-05-21
slug: angular-strategia-onpush
featured: false
draft: false
tags: [angular]
description: OnPush to strategia wykrywania zmian w Angularze, która może znacznie przyspieszyć aplikację. Tłumaczę jak działa, jak ją włączyć i na jaką pułapkę trzeba uważać przy wywołaniach asynchronicznych.
---

![banner](../../../assets/blog/2023/angular-strategia-onpush/onpus_strategy.png)

Cześć! Dzisiejszym wpisem wracam do tematyki fontendowej z której już jeden wpis się pojawił na moim blogu - [Angular – cykl życia komponentu](https://homeverest.pl/angular-cykl-zycia-komponentu/). Dziś chciałbym opisać mechanizm wykrywania zmian w komponentach Angularowych. Strategia OnPush umożliwia nam w łatwy sposób zoptymalizowanie pod kątem wydajnościowym naszej aplikacji. Co to jest i jak zastosować? Oraz na co uważać, w tym artykule postaram się odpowiedzieć na te pytania.

## Strategia OnPush - wprowadzenie

Strategia OnPush jest jedną ze strategii wykrywania zmian w komponentach we frameworku Angular. Domyślnie komponenty w Angularze wykorzystują strategię Default, która sprawdza zmiany we wszystkich komponentach oraz ich komponentach potomnych zawsze kiedy dane w komponencie zostaną zmienione. Jak można się domyślać nie jest to najbardziej wydajne rozwiązanie i może w pewnych przypadkach mocno spowolnić działanie aplikacji, głównie kiedy aplikacja staje się coraz bardziej złożona i zbudowana z dużej ilości komponentów. Strategia OnPush działa inaczej niż domyślna i w aplikacjach o dużej skali może mieć to spore znaczenia dla wydajności.

Działanie strategii OnPush polega na tym, że Angularowy ChangeDetector zostanie poinformowany o zmianie w komponencie tylko jeśli zmieni się w nim referencja do właściwości Input lub w szablonie komponentu zostanie wyemitowany event. OnPush porównuje referencje właściwości Input z ich poprzednią wartością - jeżeli referencja uległa zmianie następuje markowanie komponentu, czyli oznaczenie tego komponentu dla ChangeDetectora, że w tym komponencie wraz z komponentami potomnymi należy wykryć zmiany. Jeżeli referencja nie została zmieniona komponent wraz z potomnymi zostają pomijane w cyklu wykrywania zmian.

## Strategia OnPush - implementacja

Poniżej przedstawiam bardzo prosty komponent w którym zastosowana została strategia OnPush.

```ts
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent implements OnInit {

  @Input() counter: { value: number };
  
  constructor() { }
  
  ngOnInit(): void { }
  
  private updateCounter() {
    this.counter = {
        value: 24
    };
  }
}
```

W komponencie do dekoratora dodajemy nową właściwość - `changeDetection: ChangeDetectionStrategy.OnPush`, dzięki czemu komponent będzie używał strategii OnPush. Komponent posiada pole Input, które przechowuje jakąś informację o aktualnej wartości licznika. Najważniejszym miejscem w powyższym kodzie jest metoda `updateCounter()`. Jak wspominałem wcześniej - **OnPush działa tylko na zmianę referencji Input**.

```ts
  private updateCounter() {
    this.counter.value = 24; // źle!
  }
```

Dlatego zwykłe przypisanie nowej wartości do Inputa (tak jak w kodzie powyżej) nic by nie dało, ChangeDetector nie zauważyłby żadnej zmiany. Dlatego wykonywane jest nadpisanie referencji Inputa, dzięki czemu mamy pewność, że zmiany w komponencie zostaną wykryte.

## Strategia OnPush - pułapka

Strategia OnPush wydaje się idealnym rozwiązaniem dla większych aplikacji jednak można łatwo wpaść w pułapkę związaną z wywołaniami asynchronicznymi. Powiedzmy, że chcielibyśmy aby nasz komponent co jakiś czas aktualizował swój Input, np. resetował jego wartość i przypisywał jej 0. Przykładowa implementacja będzie wyglądać następująco:

```ts
private resetCoutner() {
    setTimeout(() => {
      this.counter = {
        value: 0;
      };
    }, 10000);
}
```

Metoda `resetCounter()` będzie co 10 sekund resetować licznik. Wszystko wydaje się być w porządku ale... no właśnie okazuje się że to wcale nie działa!

https://giphy.com/gifs/starwars-movie-star-wars-3ornka9rAaKRA2Rkac

Zmiana referencji Input w asynchronicznym wywołaniu metody nie poinformuje ChangeDetector'a o zmianie w komponencie, dlatego jeśli renderujemy szablon komponentu to nie zauważymy tutaj żadnej zmiany.

Istnieje jednak rozwiązanie tego problemu. Do naszego komponentu ze strategią OnPush należy wstrzyknąć specjalny serwis - `ChangeDetectorRef`:

```ts
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent implements OnInit {

  @Input() counter: { value: number };
  
  constructor(private changeDetector : ChangeDetectorRef) {
   this.resetCoutner();
  }
  
  ngOnInit(): void { }
  
  private updateCounter() {
    this.counter = {
        value: 24
    };
  }
  
  private resetCoutner() {
    setTimeout(() => {
      this.counter = {
        value: 0;
      };
      this.changeDetector.markForCheck();
    }, 10000);
  }
}
```

Wstrzykując ten serwis dostajemy możliwość ręcznego markowania komponentu dla ChangeDetecotr'a. Dzięki takiemu rozwiązaniu zmiana Input zostanie wykryta, szablon komponentu się odświeży i wartość licznika zostanie wyzerowana.

## Strategia OnPush - podsumowanie

Podsumowując, strategia OnPush to potężne narzędzie, które może znacznie poprawić wydajność Twojej aplikacji Angular. Poprzez zmniejszenie liczby sprawdzanych komponentów podczas wykrywania zmian, może pomóc Twojej aplikacji działać szybciej i bardziej efektywnie. Jednak wymaga to pracy przy projektowaniu komponentów. Zwykle komponenty wykorzystujące strategię OnPush są komponentami niemutującymi, czyli takim które tylko wyświetlają dane które są podpięte pod pola Input. Dziękuję jeszcze raz za przeczytanie tego wpisu. Będę również bardzo wdzięczny jeżeli podzielisz się tym materiałem ze swoimi znajomymi poprzez udostępnienie na LinkedIn lub w innych mediach społecznościowych. Dzięki!

Literatura:

- [Angular OnPush Change Detection - Avoid Common Pitfalls (angular-university.io)](https://blog.angular-university.io/onpush-change-detection-how-it-works/)

- [Angular - ChangeDetectionStrategy](https://angular.io/api/core/ChangeDetectionStrategy)
