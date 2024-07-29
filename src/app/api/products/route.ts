import { NextResponse } from "next/server";
import { getConnection } from "@/libs/mysql";
import mysql from 'mysql2/promise'; // Asegúrate de importar mysql2
// Tipo para los datos del producto en la solicitud POST
interface Product {
   name: string;
   description: string;
   price: number;
}

// Handler para la solicitud GET
export async function GET() {
   try {
      const connection = await getConnection();
      const [result] = await connection.query("Select * from products");
      // Retornar la respuesta con los datos obtenidos
      return NextResponse.json({ message: 'Listing products', data: result });
   } catch (error) {
      // Manejo de errores
      console.error('Error al consultar la base de datos:', error);
      return NextResponse.json({ message: 'Error en la consulta a la base de datos' }, { status: 500 });
   }
}

// Handler para la solicitud POST
export async function POST(request: Request) {
   try {
      // Obtener los datos del cuerpo de la solicitud
      const { name, description, price }: Product = await request.json();

      // Imprimir los datos recibidos en la consola
      console.log({ name, description, price });

      const connection = await getConnection();

      const [result] = await connection.query(
         'INSERT INTO products SET ?', {
         name: name,
         description: description,
         price: price
      }
      );
      // Retornar respuesta exitosa
      return NextResponse.json({
         name,
         description,
         price,
         id: (result as mysql.OkPacket).insertId // Asegúrate de que result tenga insertId
      });
   } catch (error) {
      // Manejo de errores
      console.error('Error al crear el producto:', error);
      return NextResponse.json({ message: 'Error al crear el producto' }, { status: 500 });
   }
}
