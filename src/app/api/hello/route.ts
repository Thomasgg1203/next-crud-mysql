'use server';

import { NextResponse } from 'next/server';
import { getConnection } from '@/libs/mysql';

export async function GET() {
    let connection;
    try {
        // Obtener la conexión a la base de datos
        connection = await getConnection();
        
        // Realizar la consulta a la base de datos
        const [rows] = await connection.execute('SELECT NOW()');
        console.log(rows);
        
        // Retornar una respuesta JSON exitosa
        return NextResponse.json({ message: 'hello world', data: rows });
    } catch (error) {
        // Manejo de errores
        console.error('Error al consultar la base de datos:', error);
        return NextResponse.json({ message: 'Error en la consulta a la base de datos' }, { status: 500 });
    } finally {
        // Cerrar la conexión (si es necesario)
        if (connection) {
            await connection.end();
        }
    }
}
