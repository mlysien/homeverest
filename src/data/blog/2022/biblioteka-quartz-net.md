---
title: Biblioteka Quartz.NET
author: Mateusz Łysień
pubDatetime: 2022-10-27
slug: biblioteka-quartz
featured: false
draft: false
tags: [quartz.net, c#, library]
description:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut
---


Cześć! Dzisiejszy wpis będzie poświęcony bibliotece Quartz.NET, dzięki której w łatwy sposób można zarządzać wykonywaniem zadań w obrębie aplikacji. Biblioteka Quarts.NET to lekka i bardzo intuicyjna biblioteka oraz ma spore możliwości jeśli chodzi o planowanie zadań. Zaczynajmy!

![banner](/src/assets/blog/2022/biblioteka-quartz-net/quartz-bg.png)

## Biblioteka Quartz.NET - co to jest?

Biblioteka Quartz.NET to narzędzie które umożliwia planowanie wykonywania zadań w aplikacji, co oznacza, że można wykonywać pewne fragmenty (komponenty) aplikacji w określonych interwałach czasowych lub - co odróżnia już na starcie Quartz.NET od zwykłych .NET-owy timerów - o określonych porach w wybrane dni tygodnia, miesiąca itp..

Quartz.NET jest bardzo przyjazną biblioteką, posiada kilka interfejsów oraz paradygmatów, które w łatwy sposób można użyć w każdym projekcie. Konfiguracja biblioteki wymaga niewielkiego nakładu pracy, co powoduje, że w zasadzie można zacząć z niej korzystać zaraz po dodaniu paczki nuget. Najważnieszymi elementami składowymi biblioteki Quartz.NET są:

- **Job** - to pojedyncze zadanie, jakie ma się wykonać, zadanie definiowane musi zostać przy użyciu interfejsu IJob.

- **Trigger -** kontroluje wywoływanie się pojedynczych Jobów. Jego zadaniem jest zdefiniowanie zasad wywołania konkretnego Joba - kiedy ma się odbyć, jak często powtarzać, itp..

- **Scheduler** - to serce biblioteki, ponieważ odpowiada za zarządzanie Triggerami i Jobami.

To co warto jeszcze dodać, to fakt, że biblioteka Quartz.NET potrafi zapamiętać harmonogram zadań - to jest przydatne w momencie awarii aplikacji - kiedy dochodzi do ponownego uruchomienia. Wtedy po restarcie Scheduler potrafi odtworzyć swój stan i kontynuować swoje działanie. Oczywiście zapraszam na stronę biblioteki Quartz.NET, gdzie znajdziecie więcej informacji na jej temat, [tutaj link](https://www.quartz-scheduler.net/). A poniżej prosty przykład wykorzystania Quartz.NET w aplikacji.

## Biblioteka Quartz.NET - przykładowe użycie

Na potrzeby tego wpisu utworzymy prostą aplikację, która cyklicznie będzie pobierać informacje o temperaturze z kilku źródeł i wyświetlać je w konsoli. Aby zacząć korzystać z biblioteki Quartz.NET najwygodniej zainstalować ją z paczki Nuget. Instalujemy najnowszą dostępną wersję biblioteki Quartz.NET.

![screen](/src/assets/blog/2022/biblioteka-quartz-net/image.png)

W tym momencie można przejść do implementacji kodu aplikacji. Tak jak wspominałem w tym przykładzie utworzę prostą aplikację konsolową, która wyświetlać będzie temperatury z różnych źródeł.

Zacznijmy od definicji serwisu temperatury. Poniżej jego definicja, jak widać jest to bardzo trywialny przykład, ale nie chodzi o tworzenie skomplikowanej struktury lecz o pokazanie działania biblioteki Quartz.NET.

```csharp 
internal interface ITemperatureService
{
  double GetTemperature();
}
```

Mając już zdefiniowany interfejs utworzymy jego implementacje. Przykładowo utworzymy serwis do pobierania temperatury jaka jest w kuchni, analogicznie można utworzyć implementacje dla innych źródeł.

```csharp 
internal class KitchenTemperatureService : ITemperatureService
{
	public double GetTemperature()
    {
    	var random = new Random();
        return random.Next(20, 30);
	}
}
```

Mając zaimplementowaną logikę biznesową powiedzmy, że potrzebujemy pobierać dane o temperaturze z różnych pomieszczeń o różnych porach dnia. W tym celu trzeba zdefiniować zadania (Joby), aby to zrobić wykorzystamy interfejs dostarczony przez Quartz.NET - **IJob**. Poniżej definicja Joba, którego zadaniem jest pobieranie informacji o temperaturze w kuchni.

```csharp 
internal class KitchenTemperatureJob : IJob
{
	private readonly ITemperatureService _temperatureService;
    
	public KitchenTemperatureJob()
    {
    	_temperatureService = new KitchenTemperatureService();
	}

	public Task Execute(IJobExecutionContext context)
    {
    	return Task.Run(() =>
        {
        	var temperature = _temperatureService.GetTemperature();
            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.WriteLine($"Temperatura w kuchni: {temperature} *C");
		});
	}
}
```

Jak widać wykorzystujemy w tym Jobie wcześniej zdefiniowany serwis do pobierania temperatury. Logika w Jobach może być dużo bardziej skomplikowana np. poprzez wykorzystywanie Dependency Injection. Mając gotową implementację Joba, możemy w startowym punkcie programu - w aplikacji konsolowej będzie to funkcja **Main** - zdefiniować pozostałe Joby. Analogicznie do Joba pobierającego temperaturę w kuchni, zdefiniowałem dwa inne:

```csharp 
// define jobs
var kitchenJob = JobBuilder.Create<KitchenTemperatureJob>().Build();
var bedroomJob = JobBuilder.Create<BedroomTemperatureJob>().Build();
var outsideJob = JobBuilder.Create<OutsideTemperatureJob>().Build();
```

Zdefiniowane Joby będą wykonywane przez inny komponent biblioteki Quartz.NET - **Trigger**. Każdy Job będzie wykonywany przez osobny Trigger. Poniżej konfiguracja Triggerów, które będą uruchamiać wcześniej zdefiniowane Joby:

```csharp 
// define triggers
var kitchenTrigger = TriggerBuilder.Create().WithCronSchedule("0 0 14 * * ?").Build();

var bedroomTrigger = TriggerBuilder.Create()
  .WithSimpleSchedule(x => x.WithIntervalInHours(2).RepeatForever())
  .Build();

var outsideTrigger = TriggerBuilder.Create()
  .WithSimpleSchedule(x => x.WithIntervalInMinutes(5).RepeatForever())
  .Build();
```

Konfigurowanie Triggerów jest bardzo intuicyjne, dzięki wielu zdefiniowanym w bibliotece metodom do ustawiania czasu wykonywania Jobów. Najciekawsza konfiguracja, która najbardziej zwraca uwagę to konfiguracja pierwszego Triggera.

```csharp 
var kitchenTrigger = TriggerBuilder.Create().WithCronSchedule("0 0 14 * * ?").Build();
```

Zapis jaki został użyty to tzw. Cron Expressions - pewnie dla osób, które na co dzień pracują na systemach Linux będzie on znany. Dla mniej odważnych podsyłam link - [cron expresssions](https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm) :)  
Zapis ten oznacza, że Trigger będzie wykonywał przypisanego do niego Joba codziennie o godzinie 14:00.

Po zdefiniowaniu Jobów oraz Triggerów możemy przejść do zdefiniowania głównego komponentu biblioteki Quartz.NET - **Schedulera**:

```csharp 
// create scheduler
var factory = new StdSchedulerFactory();
var scheduler = await factory.GetScheduler();
await scheduler.Start();
```

W tym momencie mamy utworzony Scheduler, jak widać wykorzystany jest tutaj wzorzec fabryki. Na nasze potrzeby wystarczy nam wyprodukowanie standardowego Schedulara. Zaraz po utworzeniu uruchamiamy go i przechodzimy do kolejnego ważnego punktu - połączenia wcześniej utworzonych Jobów z Triggerami. Do tego celu wykorzystamy słownik, który będzie przyjmował jako klucz Joba, a wartość podpięte do niego Triggery.

```csharp 
var dictionary = new Dictionary<IJobDetail, IReadOnlyCollection<ITrigger>>();
dictionary.Add(kitchenJob, new HashSet<ITrigger>() {kitchenTrigger});
dictionary.Add(bedroomJob, new HashSet<ITrigger>() { bedroomTrigger });
dictionary.Add(outsideJob, new HashSet<ITrigger>() { outsideTrigger });
```

Akurat w przykładowej aplikacji każdy Job ma własnego Triggera, jednak może się zdarzyć, że jeden Job będzie wywoływany przez kilka Triggerów - dlatego wymagane jest podanie kolekcji Triggerów. Na koniec dodajemy naszą definicje słownikową do zdefiniowanego Schedulera:

```csharp 
await scheduler.ScheduleJobs(dictionary, true);
```

To tyle.

Po uruchomieniu aplikacji w oknie konsoli będą się pojawiać informacje o temperaturach w odstępach czasowych zdefiniowanych przy pomocy Triggerów.

![screen](/src/assets/blog/2022/biblioteka-quartz-net/image-1.png)

## Biblioteka Quartz.NET - podsumowanie

To tyle w tym temacie. Przykład może bardzo trywialny lecz myślę, że pokazujący jakie możliwości daje wykorzystanie biblioteki Quartz.NET. Zamiast komunikatów w konsoli, można emitować eventy do innych komponentów systemu. Możliwości są naprawdę duże. Dziękuję za przeczytanie tego wpisu. Będę również bardzo wdzięczny jeżeli podzielisz się tym materiałem ze swoimi znajomymi poprzez udostępnienie na LinkedIn lub w innych mediach społecznościowych. Dzięki!
