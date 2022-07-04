# STRESS TESTING

Για την πραγματοποίηση του Stress Testing χρησιμοποιήθηκε το JMeter.
Επειδή το testing γίνεται για μεγάλο αριθμό χρηστών, τα .jmx αρχεία εκτελούνται μέσω command line τρέχοντας το αρχείο runTest.bat 
και δίνοντας ως παράμετρο το κατάλληλο .jmx αρχείο κάθε φορά.

Επισημαίνεται ότι για να αποφευχθεί "out of memory" σφάλμα κατά την εκτέλεση των test πρέπει να αντικατασταθεί η εξής γραμμή "HEAP=-Xms1g -Xmx1g" στο startup script του JMeter (/bin/jmeter.bat) με την εξής γραμμής:  "HEAP=-Xms1g -Xmx4g".

Στον φάκελο υπάρχουν τα εξής .jmx αρχεία:
- TestTotal.jmx :stress test στο microservice-api-total, δέχεται παραμέτρους από το .csv test1.csv
- TestFlows.jmx :stress test στο microservice-api-flows, δέχεται παραμέτρους από το .csv test2.csv
- TestGeneration.jmx :stress test στο microservice-api-generation, δέχεται παραμέτρους από το .csv test3.csv
