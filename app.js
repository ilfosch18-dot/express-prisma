// Import express
import express from "express";
// import router
import booksRouter from './routers/books.js';
import errorServerSide from "./middlewares/errorServerSide.js";
import errorNotFound from "./middlewares/errorNotFound.js";

// Setup
const app = express();
const port = 3000;

app.use(express.json());

// Routing homepage
app.get('/', (req,res) => {
    res.send('Questa è la home della libreria');
});

// Collego tutte le rotte API relative alla gestione dei libri - Create | Read | Update | Delete (CRUD)
app.use('/books', booksRouter);

// middlewares errorServerSide
app.use(errorServerSide);

// middlewares errorNotFound
app.use(errorNotFound)

// Start server
app.listen(port, () => console.log('Il server è partito correttamente su http://localhost:' + port)
);
