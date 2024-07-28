import express from 'express';
import sql from 'mssql';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),  // Asegúrate de convertir el puerto a número
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true', // Convierte el valor a booleano
        trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true' // Convierte el valor a booleano
    }
};

// Función para realizar una consulta a la base de datos
async function getUsuario() {
    let pool;
    try {
        pool = await sql.connect(config);
        const result = await pool.request().query('SELECT id, username, password FROM usuario');
        return result.recordset;
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        return [];
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Ruta que usa la base de datos
app.get("/", async (req, res) => {
    const movies = await getUsuario();
    res.json(movies);
});

async function getContenido(id) {
    let pool;
    try {
        pool = await sql.connect(config);
        const result = await pool.request()
            .input('valor', sql.Int, id)  // Usa el parámetro id
            .query(`
                SELECT * 
                FROM contenido 
                WHERE id NOT IN (
                    SELECT id_contenido 
                    FROM eliminado 
                    WHERE id_usuario = @valor
                )
            `);
        return result.recordset;
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        return [];
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Ruta que usa la base de datos
app.get("/contenido", async (req, res) => {
    const id = req.query.id;  // Obtén el id del query string
    const movies = await getContenido(id);  // Pasa el id a la función
    res.json(movies);
});


async function getDataElemento(id) {
    let pool;
    try {
        pool = await sql.connect(config);

        // Añade el parámetro a la consulta
        const result = await pool.request()
            .input('id', sql.Int, id) // Ajusta el tipo según el tipo de datos en la base de datos
            .query('SELECT * FROM contenido WHERE id = @id');

        return result.recordset;
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        return [];
    } finally {
        if (pool) {
            await pool.close(); // Cierra el pool solo si está definido
        }
    }
}

// Ruta que usa la base de datos
app.get("/data_elemento", async (req, res) => {
    const id = req.query.id;  // Obtén el id del query string
    const movies = await getDataElemento(id);  // Pasa el id a la función
    res.json(movies);
});

async function insertFavorito(contenido, usuario) {
    let pool;
    try {
        pool = await sql.connect(config);

        // Verifica si el registro ya existe en la tabla favorito
        const checkQuery = 'SELECT COUNT(*) AS count FROM favorito WHERE id_contenido = @contenido AND id_usuario = @usuario';
        const checkResult = await pool.request()
            .input('contenido', sql.Int, contenido)
            .input('usuario', sql.Int, usuario)
            .query(checkQuery);

        if (checkResult.recordset[0].count > 0) {
            return { message: 'Este contenido ya esta en tus favoritos' };
        }

        // Verifica si el registro existe en la tabla eliminado
        const verifyQuery = 'SELECT COUNT(*) AS count FROM eliminado WHERE id_contenido = @contenido AND id_usuario = @usuario';
        const verifyResult = await pool.request()
            .input('contenido', sql.Int, contenido)
            .input('usuario', sql.Int, usuario)
            .query(verifyQuery);

        if (verifyResult.recordset[0].count > 0) {
            return { message: 'Este contenido fue eliminado de tu catalogo' };
        }

        // Inserta el nuevo registro en la tabla favorito si no existe
        const insertQuery = 'INSERT INTO favorito (id_contenido, id_usuario) VALUES (@contenido, @usuario)';
        await pool.request()
            .input('contenido', sql.Int, contenido)
            .input('usuario', sql.Int, usuario)
            .query(insertQuery);


        return { message: 'El contenido ha sido registrado correctamente en tus favoritos' };

    } catch (err) {
        console.error('Error al insertar en la base de datos:', err.message || err);
        return { error: 'Error al insertar en la base de datos' };
    } finally {
        if (pool) {
            try {
                await pool.close(); // Intenta cerrar el pool
            } catch (closeError) {
                console.error('Error al cerrar el pool de conexiones:', closeError.message || closeError);
            }
        }
    }
}



app.get("/insert_favorito", async (req, res) => {
    const contenido = parseInt(req.query.contenido, 10); // Obtén el contenido del query string
    const usuario = parseInt(req.query.usuario, 10); // Obtén el usuario del query string

    if (isNaN(contenido) || isNaN(usuario)) {
        return res.status(400).json({ error: 'Parámetros inválidos' });
    }

    const result = await insertFavorito(contenido, usuario);  // Pasa los parámetros a la función
    res.json(result); // Devuelve el resultado de la inserción
});



///////////////////////////////////////////////

async function deleteContenido(contenido, usuario) {
    let pool;
    try {
        pool = await sql.connect(config);

        // Verifica si ya existe el registro
        const checkQuery = 'SELECT COUNT(*) AS count FROM eliminado WHERE id_contenido = @contenido AND id_usuario = @usuario';
        const checkResult = await pool.request()
            .input('contenido', sql.Int, contenido)
            .input('usuario', sql.Int, usuario)
            .query(checkQuery);

        if (checkResult.recordset[0].count > 0) {
            return { message: 'Este contenido ya fue eliminado de tu catalogo' };
        }

        // Inserta el nuevo registro en la tabla eliminado
        const insertQuery = 'INSERT INTO eliminado (id_contenido, id_usuario) VALUES (@contenido, @usuario)';
        await pool.request()
            .input('contenido', sql.Int, contenido)
            .input('usuario', sql.Int, usuario)
            .query(insertQuery);

        // Elimina el registro de la tabla favorito
        const deleteQuery = 'DELETE FROM favorito WHERE id_contenido = @contenido AND id_usuario = @usuario';
        await pool.request()
            .input('contenido', sql.Int, contenido)
            .input('usuario', sql.Int, usuario)
            .query(deleteQuery);

        return { message: 'Este contenido ha sido eliminado correctamente de tu catalogo' };

    } catch (err) {
        console.error('Error al realizar la operación en la base de datos:', err.message || err);
        return { error: 'Error al realizar la operación en la base de datos' };
    } finally {
        if (pool) {
            try {
                await pool.close(); // Intenta cerrar el pool
            } catch (closeError) {
                console.error('Error al cerrar el pool de conexiones:', closeError.message || closeError);
            }
        }
    }
}


app.get("/delete_contenido", async (req, res) => {
    const contenido = parseInt(req.query.contenido, 10); // Obtén el contenido del query string
    const usuario = parseInt(req.query.usuario, 10); // Obtén el usuario del query string

    if (isNaN(contenido) || isNaN(usuario)) {
        return res.status(400).json({ error: 'Parámetros inválidos' });
    }

    const result = await deleteContenido(contenido, usuario);  // Pasa los parámetros a la función
    res.json(result); // Devuelve el resultado de la inserción
});



//////////////////////////////////////

async function getFavorito(id) {
    let pool;
    try {
        pool = await sql.connect(config);

        // Añade el parámetro a la consulta
        const result = await pool.request()
            .input('id', sql.Int, id) // Ajusta el tipo según el tipo de datos en la base de datos
            .query(`SELECT * FROM contenido
                    WHERE id IN (
                        SELECT id_contenido 
                        FROM favorito 
                        WHERE id_usuario = @id)
                    ORDER BY id ASC;`);

        return result.recordset;
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        return [];
    } finally {
        if (pool) {
            await pool.close(); // Cierra el pool solo si está definido
        }
    }
}

// Ruta que usa la base de datos
app.get("/favorito", async (req, res) => {
    const id = req.query.id;  // Obtén el id del query string
    const movies = await getFavorito(id);  // Pasa el id a la función
    res.json(movies);
});

/////////////////////////////////////

async function deleteFavorito(contenido, usuario) {
    let pool;
    try {
        pool = await sql.connect(config);

        // Ejecuta la consulta DELETE
        const result = await pool.request()
            .input('contenido', sql.Int, contenido)
            .input('usuario', sql.Int, usuario)
            .query('DELETE FROM favorito WHERE id_contenido = @contenido AND id_usuario = @usuario');

        // Retorna un mensaje de éxito
        return { message: 'Favorito eliminado correctamente' };
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        return { error: 'Error al eliminar el favorito' };
    } finally {
        if (pool) {
            await pool.close(); // Cierra el pool solo si está definido
        }
    }
}

// Ruta que usa la base de datos
app.get("/delete_favorito", async (req, res) => {
    const contenido = parseInt(req.query.contenido, 10); // Obtén el contenido del query string
    const usuario = parseInt(req.query.usuario, 10); // Obtén el usuario del query string

    if (isNaN(contenido) || isNaN(usuario)) {
        return res.status(400).json({ error: 'Parámetros inválidos' });
    }
    
    const result = await deleteFavorito(contenido, usuario);  // Pasa `contenido` y `usuario` a la función
    res.json(result);
});

/////////////

async function resetCatalogo(id) {
    let pool;
    try {
        pool = await sql.connect(config);

        // Asegúrate de que el tipo de dato coincide con el tipo en la base de datos
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM eliminado WHERE id_usuario = @id');

        // No necesitas devolver recordset si solo estás haciendo DELETE, puedes devolver un mensaje de éxito
        return { message: 'Registro eliminado con éxito' };
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        return { error: 'Error al consultar la base de datos' };
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Ruta que usa la base de datos
app.get("/reset_catalogo", async (req, res) => {
    const id = req.query.id;  // Obtén el id del query string
    const movies = await resetCatalogo(id);  // Pasa el id a la función
    res.json(movies);
});


///////////////

app.use(express.json()); // Middleware para manejar JSON

async function insertRegistro(name, correo, password) {
    let pool;
    try {
        pool = await sql.connect(config);
        const result = await pool.request()
            .input('name', sql.NVarChar, name)
            .input('correo', sql.NVarChar, correo)
            .input('password', sql.NVarChar, password)
            .query('INSERT INTO usuario (correo, username, password) VALUES (@correo, @name, @password)');
        return { message: 'Registro insertado con éxito' };
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        return { error: 'Error al consultar la base de datos' };
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

app.post("/insertar_registro", async (req, res) => {
    const { name, correo, password } = req.body;
    const result = await insertRegistro(name, correo, password);
    res.json(result);
});

///////////
app.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
});