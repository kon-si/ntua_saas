# STRESS TESTING

Για την πραγματοποίηση του Stress Testing χρησιμοποιήθηκε το JMeter.
Επειδή το testing γίνεται για μεγάλο αριθμό χρηστών, τα .jmx αρχεία εκτελούνται μέσω command line τρέχοντας το αρχείο runTest.bat.(Παράδειγμα εκτέλεσης εντολής από cmd: runTest.bat TestTotal.jmx)
και δίνοντας ως παράμετρο το κατάλληλο .jmx αρχείο κάθε φορά.

Επισημαίνεται ότι για να αποφευχθεί "out of memory" σφάλμα κατά την εκτέλεση των test πρέπει να αντικατασταθεί η εξής γραμμή "HEAP=-Xms1g -Xmx1g" στο startup script του JMeter (/bin/jmeter.bat) με την εξής γραμμής:  "HEAP=-Xms1g -Xmx4g".

Στον φάκελο υπάρχουν τα εξής .jmx αρχεία:
- TestTotal.jmx :stress test στο microservice-api-total, δέχεται παραμέτρους από το .csv test1.csv
- TestFlows.jmx :stress test στο microservice-api-flows, δέχεται παραμέτρους από το .csv test2.csv
- TestGeneration.jmx :stress test στο microservice-api-generation, δέχεται παραμέτρους από το .csv test3.csv

Παρατίθενται ακόμα, στον υποφάκελο test-results, 4 .txt αρχεία στα οποία φαίνονται τα αποτελέσματα που εμφανίζονται στο terminal κατά την εκτέλεση stress test με 2000 χρήστες να τελούν αλλεπάλληλα requests στο api endpoint που αφορά το test κάθε φορά.
Στα test-results υπάρχει ακόμα ο φάκελος diagrams στον οποίο δίνονται 3 ενδεικτικά .jtl αρχεία από τα οποία προκύπτουν τα διαγράμματα που εμφανίζονται παρακάτω και ένα .jmx αρχείο με το Test Plan που περιέχει τους Listeners που χρησιμοποιήθηκαν για την παραγωγή των διαγραμμάτων/πινάκων.

Κατά την εκτέλεση του κάθε επιμέρους test δημιουργείται, εφόσον δεν υπάρχει ήδη, φάκελος με τίτλο την ημερομηνία της ημέρας εκτέλσης και μέσα δημιουργείται ένα αρχείο .jtl με τα αποτελέσματα της εκτέλεσης του test και τίτλο που προκύπτει από την ώρα της αρχής της εκτέλεσης.

Για να τρέξουν σωστά τα test θα πρέπει να βρίσκονται μέσα στον φάκελο bin που βρίσκεται και το jmeter.bat .

## Ενδεικτικά Αποτελέσματα Testing:

## Microservice-Api-Total
### Διάγραμμα Active Threads Over Time:
![image](https://user-images.githubusercontent.com/94255085/177210010-5d52cb19-2109-4dca-89e6-316934efa57d.png)

### Aggragate Report:
![image](https://user-images.githubusercontent.com/94255085/177210036-6d5abcaf-ca37-4535-9767-22a397887c6e.png)
![image](https://user-images.githubusercontent.com/94255085/177210057-1bf17102-3242-471a-b145-04edf34f5745.png)

### Διάγραμμα Response Times Over Time:
![image](https://user-images.githubusercontent.com/94255085/177210097-6db48de8-7407-491c-bc3f-7354198081b0.png)



## Microservice-Api-Flows
### Διάγραμμα Active Threads Over Time:
![image](https://user-images.githubusercontent.com/94255085/177210797-c487474d-475a-42af-b9fb-c6ca179b4fee.png)


### Aggragate Report:
![image](https://user-images.githubusercontent.com/94255085/177210698-01926055-dd57-43ec-8e63-d84352a2f537.png)
![image](https://user-images.githubusercontent.com/94255085/177210706-d9427aec-9225-4928-a26c-090313061bd9.png)

### Διάγραμμα Response Times Over Time:
![image](https://user-images.githubusercontent.com/94255085/177210680-db469494-cbdb-4755-8050-e84293080a25.png)

## Microservice-Api-Generation
### Διάγραμμα Active Threads Over Time
![image](https://user-images.githubusercontent.com/94255085/177208766-a769f682-d00c-4688-a97c-f9562fad0a38.png)


### Aggragate Report:
![image](https://user-images.githubusercontent.com/94255085/177208347-d7a2a800-d9d2-4971-9cb6-98a7080bf021.png)
![image](https://user-images.githubusercontent.com/94255085/177208457-8b45378f-bdcd-4f5c-8837-098d9624c0a2.png)

### Διάγραμμα Response Times Over Time:
![image](https://user-images.githubusercontent.com/94255085/177208610-afb89c61-da0e-46c4-9ebb-28102e9e1d7c.png)

