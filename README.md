# MenZg

**MenZg je web aplikacija namijenjena studentima i posjetiteljima zagrebačkih studentskih menzi, koja pruža centraliziran pristup informacijama o lokacijama, radnom vremenu, dnevnim jelovnicima i gužvama u menzama. Cilj ovog projekta je olakšati planiranje obroka, smanjiti čekanje te unaprijediti korisničko iskustvo i organizaciju studentskih menzi, potičući učinkovitiju organizaciju i povećano zadovoljstvo korisnika.**

# Opis projekta
## Napomena
Ovaj projekt je reultat timskog rada u sklopu projeknog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu. 

## Motivacija
Uz veliki broj studenata koji koriste menze u Zagrebu, dolazi i niz izazova vezanih za dobivanje ažurnih informacija o radnom vremenu, dnevnim jelovnicima te o gužvama u menzama. Trenutno nema praktičnog načina da studenti i ostali posjetitelji menzi dobiju ovakve informacije, što često rezultira dugim čekanjem i poteškoćama u planiranju obroka. Naša aplikacija MenZg osmišljena je s ciljem da olakša pristup ovim podacima i unaprijedi iskustvo posjeta menzama, nudeći studentima brzo i jednostavno rješenje za informiranije odluke i smanjenje nepotrebnog čekanja. Ovim projektom želimo doprinijeti boljoj organizaciji studentskog života u Zagrebu te potaknuti učinkovito korištenje resursa menzi.

## Stečena znanja
Radom na projektu MenZg članovi našeg tima steći će praktična znanja u korištenju modernih tehnologija i metoda razvoja softvera. Izrada korisničkog sučelja (frontenda) aplikacije preko React biblioteke omogućit će nam da naučimo napredne prakse u dizajnu interaktivnih aplikacija, dok ćemo backend razvijati u Javi koristeći Spring Boot, što će nas uvesti u svijet server-side programiranja i rada s bazama podataka. Također ćemo naučiti kako implementirati sigurnosne protokole za zaštitu podataka korisnika te kako učinkovito testirati i održavati aplikaciju. Najvažnije, kroz timski rad u srednje velikoj grupi učit ćemo vještine suradnje, upravljanja zadacima i komunikacije, ključne za uspješan završetak projekta.

# Funkcijski zahtjevi 
* Aplikacija omogućuje korisnicima prijavu kao student, djelatnik ili administrator pomoću e-mail adrese.
* Autentifikacija korisnika omogućena je putem OAuth2 (Google) servisa pri prijavi.
* Aplikacija treba omogućiti korisnicima pregled svih dostupnih menzi.
* Prikaz ključnih informacija menze.
* Aplikacija mora omogućiti korisnicima pristup prijenosu uživo iz menze, čime će korisnici imati uvid u trenutnu situaciju u menzi.
* Aplikacija mora omogućiti studentima razmjenu informacija i dojmova o određenim menzama.
* Aplikacija mora imati administratorsku ulogu s najvišim ovlastima.

# Nefunkcijski zahtjevi

## Zahtjevi za održavanje
Sustav treba biti dizajniran za jednostavno održavanje, s naglaskom na buduće nadogradnje i prilagodbe, te mora imati potpunu dokumentaciju koja olakšava održavanje i razvoj. Uz to, treba biti popraćen priručnikom za rad i planom 
implementacije za pravilno postavljanje sustava.

## Zahtjevi za sigurnost
Svi korisnički podaci, uključujući vjerodajnice za prijavu, moraju biti šifrirani i sigurno pohranjeni, a administrativne funkcije trebaju biti dostupne samo korisnicima s administratorskim pristupom.

## Zahtjevi za pouzdanost
Aplikacija treba biti dostupna korisnicima 99.9% vremena mjesečno kako bi osigurala stalni pristup informacijama, a također treba omogućiti automatski oporavak od neočekivanih pogrešaka poput prekida veze ili prijenosa kamere.

## Zahtjevi za skalabilnost
Aplikacija treba omogućiti proširenje broja korisnika, menzi ili novih funkcionalnosti bez značajnog utjecaja na performanse, a baza podataka mora biti skalabilna i sposobna pohraniti velike količine podataka.

# Tehnologije 
* **Frontend: React TypeScript**
* **Backend: Spring Boot (Java)**
* **Baza podataka: PostgreSQL**
* **Dokumentacija: Astah UML**
* **Testiranje: Selenium IDE**

# Instalacija
Upute za instalaciju dostupne na Wiki stranici "8. Upute za puštanje u pogon".

# Članovi tima 
*  **Nikola Bačić - voditelj**
* **Valentin Đaković**
* **Antea Knezović**
* **Eugen Kozomara**
* **Niko Rimac**
* **Karla Sikavica**
* **Blaž Stužić**

# 📝 Licenca
Ovaj projekt licenciran je pod [Creative Commons licencijom](https://github.com/vito-vrbic/Nat20Mappers/blob/master/LICENSE).
