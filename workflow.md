začni tím, že si rozjedeš stack na lokále podle https://github.com/4IT580/fitify

přečti si ty readmes, jsou v tom moudra. je to hezky napsaný a dost se dozvíš

pak si s tím trochu pohraješ, zkusíš si vytvořit stránku, osaháš si ten projekt, koukneš na tachyons jak funguje stylování
- https://components.ai/tachyons-theme/wa1obX6Fculi9IpzmHQ6?tab=editor (u mě tenhle link třeba není interaktivní, ale tohle všechno tachyons umí)
- https://roperzh.github.io/tachyons-cheatsheet/
- najdu ještě od @danielnemec nějaké další example

hodíš si někam do záložek všechny důležitý stránky který budeš otevírat. protože je budeš otevírat

![img.png](https://i.imgur.com/VALBgR9.png)

začneme s gitflow a celým flow. idk kolik máte naprogramováno a zažito z reálu, tak vám to všechno radši vysvětlím. všichni máte invite do githubu.
když si vyberu kartičku a začnu na ní programovat

### začínám
1) kartička kteoru jsem si vybral, hodím k ní hlavu (v detailu "join")
2) vlezu na `master`, stáhnu aktuální verzi
3) udělám branch ve fromátu `mico00-this-or-that-feature` - píšeme kód v angličtine, branche taky. první dva znaky jsou náš xname (v práci bych psal `om-`, ale tady je hustej ten xname)
4) pracuju, commituju atomicky, postupně pushuju abych to neměl jen na lokále (určitě pokaždé když od toho budu odcházet na delší dobu)

### z ničeho mám něco
5) když se bude blížit čas a budete to chtít někomu ukázat, nebo se poradit, nebo už to bude hotový, tak zakládám pull request v githubu. 
   * odkaz na PR přidávám jak první řádek do kartiřky
6) když mám splněno všechno co je součástí kartičky, a myslím si že je to dobrý, tak kartičku přetahuju do ready for review
7) když vidím že je něco v review, tak se na to jdu podívat, páč se kouknu co ten člověk udělal, kouknu se na ten kód a snažím se pochopit jak to funguje. 
    * čím víc kódu uvidíte, tim víc ho budete schopní napsat (nebo to bude alespoň příjemnější)
8) pokud si tu kartičku vezmete na respo na CR, což můžete:
    * dobrovolně 
    * nebo si je roházíme na standupech
    * nebo můžete napsat do messengeru že máte hotovou issue XYZ, a že se vám na ní může někdo kouknout (buď s linkem na trello, nebo s linkem na pull request kde bude link na trello) 
    * 
    * když máte kartičce respo na review (responsibility), hodíte si na ní hlavu
    * každý budeme dělat reviews, ať se prostřídáme. "každý" mám na mysli že jednu kartičku jeden člověk vypracovává a jeden člověk reviewuje. 
    * review je o tom, že se kouknu na kód, projdu kód vizuálně jeslti se tam něco dá udělat líp. pak se na lokále přepnu na branch toho PR, rozjedu si jí, a otestuju že funguje vše tak, jak je v kartičce napsáno. pokud ne, tak napíšu do PR proč to nefunguje. pokud je to něco většího, tak okamžitě iniciuji komunikaci s tím člověkem na messengeru. donuťe ho ať to fixne, ať to může jít na review danovi
9) když za vás review done, a něco se vám tam nelíbílo, tak to napíšete do PR, a kartičku přesunete do reopened. v tomhle sloupci vždy najdete kartičky které se vám vrátili z review. 
    * kdybyste někde nevěděli nebo ste chtěli odemě radu, tak mi napište. 
    * já sám budu koukat na kartičky které jsou v review než půjdou na ready to accept by PO - abyste tam mohli kartičku dát, tak ji chci vidět, důvod proč se dozvíte později

### a jaký máme vlastně kartičky?
10) kartičky jsou dvou typů - ty co musí schválit PO že jsou gucci, a kartičky které jsou pro nás. 
    * ty pro nás mají label "technical" - nerozbíjejí nic co někdy PO kontroloval, nebo jsou v rámci nějaké technologické věci, navazují přímo na master. ty můžou po review a mém posvěcení rovnou do masteru. 
    * kartičky které musí dan skouknout půjdou do test branche. to je branch kterou budeme deployovat na server k otestování danovi. pro to ještě zařídím noty

### vypadá to dobře
11) když bude kartička gucci a posvěcená od @michondr1 nebo @janpape1  k otestování danem, tak ji zamergujeme do testu. 
    * na server deplooyneme test
    * a napíšeme danovi.
12) dan pokaždé když se koukne na test, tak bude vědět co má testnout a všechno z toho bude fachat ať nás nepošle do faka s tím ať to předěláme. nebo alespoň ne moc často. 
    * když nás pošle dofaka, tak kartička jde do reopened. 
    * když za něj gucci, tak:
      * pokud jsem pozadu oproti masteru tak rebasujeme (pokud jsou konflikty tak řešíme)
      * squashujeme/fixupujeme commity do jednoho
      * mergujeme naši branch do masteru (nebo klikáme v githubu na merge do masteru).
13) v průběhu času budeme mít testy, na které teď není prostor, ale v nějaké části do ní zabrouzdáme a tyhle merge do testu/masteru budou možné jen se zelenými testy
14) až budu mít čas na to si pohrát s githubem, tak vám zakážu push do masteru, a budete moct jen přes tlačítko ve své branchi po mém approvelu

### final notes
15) svět je růůžovej a všehcno je krásný a práce nám jde od ruky
