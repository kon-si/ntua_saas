# STRESS TESTING

Για την πραγματοποίηση του Stress Testing χρησιμοποιήθηκε το JMeter.
Επειδή το testing γίνεται για μεγάλο αριθμό χρηστών, τα .jmx αρχεία εκτελούνται μέσω command line τρέχοντας το αρχείο runTest.bat.(Παράδειγμα εκτέλεσης εντολής από cmd: runTest.bat TestTotal.jmx)
και δίνοντας ως παράμετρο το κατάλληλο .jmx αρχείο κάθε φορά.

Επισημαίνεται ότι για να αποφευχθεί "out of memory" σφάλμα κατά την εκτέλεση των test πρέπει να αντικατασταθεί η εξής γραμμή "HEAP=-Xms1g -Xmx1g" στο startup script του JMeter (/bin/jmeter.bat) με την εξής γραμμής:  "HEAP=-Xms1g -Xmx4g".

Στον φάκελο υπάρχουν τα εξής .jmx αρχεία:
- TestTotal.jmx :stress test στο microservice-api-total, δέχεται παραμέτρους από το .csv test1.csv
- TestFlows.jmx :stress test στο microservice-api-flows, δέχεται παραμέτρους από το .csv test2.csv
- TestGeneration.jmx :stress test στο microservice-api-generation, δέχεται παραμέτρους από το .csv test3.csv

Κατά την εκτέλεση του κάθε επιμέρους test δημιουργείται, εφόσον δεν υπάρχει ήδη, φάκελος με τίτλο την ημερομηνία της ημέρας εκτέλσης και μέσα δημιουργείται ένα αρχείο .jtl με τα αποτελέσματα της εκτέλεσης του test και τίτλο που προκύπτει από την ώρα της αρχής της εκτέλεσης.

Για να τρέξουν σωστά τα test θα πρέπει να βρίσκονται μέσα στον φάκελο bin που βρίσκεται και το jmeter.bat .

Παρατίθενται ακόμα, στον υποφάκελο test-results, 4 .txt αρχεία στα οποία φαίνονται τα αποτελέσματα της τέλεσης stress test με 2000 χρήστες να τελούν αλλεπάλληλα requests στο api endpoint που αφορά το test κάθε φορά.
Στα test-results δίνονται ακόμα 3 ενδεικτικά .jtl αρχεία από τα οποία προκύπτουν τα διαγράμματα που εμφανίζονται παρακάτω.

## Microservice-Api-Generation
### Διάγραμμα Active Threads Over Time
![image](https://user-images.githubusercontent.com/94255085/177208766-a769f682-d00c-4688-a97c-f9562fad0a38.png)


### Aggragate Report:
![image](https://user-images.githubusercontent.com/94255085/177208347-d7a2a800-d9d2-4971-9cb6-98a7080bf021.png)
![image](https://user-images.githubusercontent.com/94255085/177208457-8b45378f-bdcd-4f5c-8837-098d9624c0a2.png)

### Διάγραμμα Response Times Over Time:
![image](https://user-images.githubusercontent.com/94255085/177208610-afb89c61-da0e-46c4-9ebb-28102e9e1d7c.png)

