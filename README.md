# Netflix Clone Gruppo Placano-Lamguanouah

Questo progetto è una **Single Page Application (SPA)** sviluppata in React che replica l'interfaccia base di una piattaforma di streaming. L'applicazione visualizza una griglia di film popolari aggiornata in tempo reale tramite API esterna, permettendo all'utente di esplorare i titoli del momento.

##  Tecnologie Utilizzate

Il progetto sfrutta uno stack moderno e performante. Le versioni specificate fanno riferimento al `package.json` attuale:

* **React** (`^19.1.1`): Libreria principale per la costruzione dell'interfaccia utente a componenti.
* **Vite** (`^7.1.7`): Build tool di nuova generazione per un ambiente di sviluppo rapido e ottimizzato.
* **Tailwind CSS** (`^4.1.17`): Framework CSS utility-first per uno styling rapido e responsive (integrato via `@tailwindcss/vite`).
* **JavaScript (ESModules)**: Logica lato client.

##  Istruzioni per Installazione e Avvio

Segui questi passaggi per configurare ed eseguire il progetto localmente:

1.  **Clona la repository:**
    ```
    git clone https://github.com/Marti-guti/Netflix-clone.git
    cd netflix-clone
    ```

2.  **Installa le dipendenze:**
    ```
    npm install
    ```

3.  **Configura le Variabili d'Ambiente:**
    Il progetto richiede un token API per comunicare con il backend di TMDB.
    > **Nota:** Nel file `env.example` fornito è presente una configurazione di esempio.

4.  **Avvia il server di sviluppo:**
    ```
    npm run dev
    ```
    L'applicazione sarà accessibile all'indirizzo mostrato nel terminale (es. `http://localhost:5173`).

##  API Utilizzate

I dati cinematografici sono forniti da **The Movie Database (TMDB)**.

* **Documentazione API:** [TMDB API Docs](https://developer.themoviedb.org/docs)
* **Endpoint Principale:** `/movie/popular`
    * Utilizzato per recuperare la lista dei film di tendenza.
    * Parametri attuali: `language=it-IT`, `page=1`.
* **Autenticazione:** Le richieste utilizzano un `Bearer Token` inviato tramite Header `Authorization`, garantendo la sicurezza delle chiamate.

##  Scelte Progettuali

### Gestione dello Stato (State Management)
Attualmente, l'applicazione utilizza il **Local State di React (`useState`)** all'interno del componente `HomePage`.

* **Perché non Redux o Context API?**
    La struttura attuale dell'app è lineare: i dati vengono scaricati e visualizzati in un'unica pagina principale (`Homepage.jsx`) che passa i dati ai figli (`CardFilm.jsx`) via props. L'introduzione di Redux o della Context API in questa fase aggiungerebbe una complessità non necessaria (over-engineering) rispetto ai benefici, dato che non c'è condivisione di stato complessa tra componenti distanti nell'albero o su rotte multiple.

### Librerie Esterne
* **Tailwind CSS:** Scelto per velocizzare lo sviluppo della UI e mantenere il markup pulito. Permette di gestire layout complessi (come la griglia dei film `grid-cols-3`) direttamente nelle classi, senza scrivere file CSS separati e riducendo il "context switching".