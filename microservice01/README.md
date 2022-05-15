# MICROSERVICE 01

## Authentication API
Πιστοποίηση χρηστών με [JWT](https://jwt.io/) tokens. Τα tokens μπορούν είτε να αποθηκευτούν στην βάση και να χρησιμοποιηθούν στο header του HTTP request ή να αποθηκευτούν ως cookies στον browser.

### Dependencies
- Express (npm install express) 
- Dotenv (npm install dotenv)
    - Για την αποθήκευση ευαίσθητης πληροφορίας με χρήση μεταβλητών περιβάλλοντος.
- Jsonwebtoken (npm install jsonwebtoken)
- Bcryptjs (npm install bcryptjs) 
    - Για την κρυπτογράφηση (hash) των κωδικών χρηστών πριν αποθηκευτούν στην βάση.  
- Cookie Parser (npm install cookie-parser)
    - Για την διαχείρηση των cookies.
- [Sequelize](https://sequelize.org/docs/v6/) (npm install --save sequelize)
    - ORM: Ενδιάμεσο στρώμα διαχείρισης μοντέλων δεδομένων για πιο εύκολη πρόσβαση σε βάση και φορητότητα εφαρμογής. Για υποστήριξη PostgeSQL πρέπει να εγκαταστήσουμε το κατάλληλο συμπληρωματικό πακέτο (npm install --save pg pg-hstore).
### Dev Dependencies
- Nodemon (npm install nodemon -D)
    - Επανακινεί τον server αυτόματα κάθε φορά που κάνουμε αλλαγές στον κώδικα.

### Αρχιτεκτονική
Την δομή του API συντελούν τα αρχεία:
- index.js
    - Δημιουργία server.
- user.js
    - Μοντέλο που αναπαριστά την δομή των δεδομένων στην βάση.
- database.js
    - Σύνδεση στην βάση δεδομένων χρησιμοποιώντας το Sequelize και συχρονισμός του μοντέλου δεδομένων της εφαρμογής με την βάση.
- app.js
    - Τερματικά εφαρμογής.
- auth.js 
    - Βοηθητική συνάρτηση για την πιστοποίηση του [JWT](https://jwt.io/) token.

### Τερματικά (Endpoints)
- Register (http://localhost:9103/api/register)
Τερματικό για την δημιουργία νέου χρήστη και την έκδοση [JWT](https://jwt.io/) token. Στο σώμα του HTTP request πρέπει να περιλαμβάνονται τα στοιχεία του χρήστη στην παρακάτω μορφή:

```JSON
{
    "first_name": "fname",
    "last_name": "lname",
    "username": "usrname",
    "email": "name@mail.com",
    "password": "12345"
}
```

- Login (http://localhost:9103/api/login)
Τερματικό για την πιστοποίηση εγγεγραμμένου χρήστη και την έκδοση [JWT](https://jwt.io/) token. Στο σώμα του HTTP request πρέπει να περιλαμβάνονται τα στοιχεία του χρήστη στην παρακάτω μορφή:

```JSON
{
    "username": "usrname",
    "email": "name@mail.com",
    "password": "12345"
}
```

- Logout (http://localhost:9103/api/logout)
Τερματικό για την για την περίπτωση χρήσης με cookies το οποίο κάνει εκκαθάριση των cookies του browser.
