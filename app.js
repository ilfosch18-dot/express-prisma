// Import express
import express from "express";
// import router
import booksRouter from './routers/books.js';

// Setup
const app = express();
const port = 3000;

// Routing homepage
app.get('/', (req,res) => {
    res.send('Questa è la home della libreria');
});

// Collego tutte le rotte API relative alla gestione dei libri - Create | Read | Update | Delete (CRUD)
app.use('/books', booksRouter);

// Start server
app.listen(port, () => console.log('Il server è partito correttamente su http://localhost:' + port)
);
