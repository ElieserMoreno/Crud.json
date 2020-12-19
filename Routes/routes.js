const { Router } = require('express');
const router = Router();
const fs = require('fs');

const entregasFile = fs.readFileSync("./entregas.json", "utf-8");
let entregas = JSON.parse(entregasFile);

router.get('/', (req, res) => {
    res.json('Bienvenido a mi API');
})

router.get('/entregas', (req, res) => {
    res.status(200).json(entregas);
})

router.post('/entregas', (req, res) => {
    const { name, genre, Lenguaje, year, developer } = req.body;

    if (!name || !genre || !year || !developer) {
        res.status(401).json({ error: 'Por favor, diligencie todos los datos.' });
    } else {
        const id = entregas.length + 1;

        let newEntrega = {
            id,
            name,
            Lunguaje,
            genre,
            year,
            developer,
        };

        enrtregas.push(newEntregas);
        const json_entregas = JSON.stringify(entregas);

        fs.writeFileSync('./entregas.json', json_entregas, 'utf-8');

        res.status(200).json_entregas;
    }
});

router.put('/entregas/:id', (req, res) => {
    const { name, genre, Lenguaje, year, developer } = req.body;
    const id = req.params.id;

    if (!name || !genre || !year || !developer || !id) {
        res.status(401).json({ error: 'Debe completar los datos y especificar el id.' })
    } else {
        entregas.filter((entrega) => {
            if (entregas.id == id) {
                entregas.name = name;
                entregas.Lenguaje = Lenguaje;
                entregas.genre = genre;
                entregas.year = year;
                entregas.developer = developer;
            }
        });

        const json_entregas = JSON.stringify(entregas);
        fs.writeFileSync('./entregas.json', json_entregas, 'utf-8');

        res.status(200).json(entregas);
    }
});

router.delete('/entregas/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(401).json({ error: 'Especifique un Id' });
    } else {
        const indexEntrega = entregas.findIndex((entregas) => entregas.id === id);
        entregas.splice(indexEntrega, 1);

        const json_entregas = JSON.stringify(entregas);
        fs.writeFileSync('./entregas.json', json_entregas, 'utf-8');

        res.status(200).json(entregas);
    }
});

module.exports = router;