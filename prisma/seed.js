import 'dotenv/config';
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/index.js";

// creo il setup del client
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

const randArrayIndex = (lenght) => Math.floor(Math.random() * lenght);

async function main() {
    console.log('Avvio seeding');

    // rimuovo eventuali dati precedenti
    await prisma.book.deleteMany(); // va prima book perchè in category c'è la FK e non posso cancellarla per prima
    await prisma.category.deleteMany();

    // genero le categorie (6x)
    const categoriesName = ['Avventura', 'Azione', 'Anime', 'Sport', 'Storia', 'Fantascienza'];

    await prisma.category.createMany({
        data: categoriesName.map((cat) => ({
            name: cat,
        }))
    });

    // Lettura delle categorie appena create
    const categories = await prisma.category.findMany();
    console.log(categories);

    // genero dei libri
    // preparazione dell'array dei libri
    const books = [];
    for (let i = 0; i < 10; i++){
        books.push({
            title: `Book ${i + 1}`,
            author: `Author ${i + 1}`,
            price: 12.10,
            categoryId: categories[randArrayIndex(categories.length)].id,
  });
    }
    
    // invio la query al db per inserimento book
    await prisma.book.createMany({
        data: books,
        })
    }

main().catch(e => {
    console.log(e);
    process.exit(1); // 1 sta per indicare: chiudi il processo con un errore
}).finally(() => prisma.$disconnect()); // chiude la connessione al database
