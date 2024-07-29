import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ message:'obteniendo un producto' });
}

export function DELETE() {
    return NextResponse.json({ message: 'eliminando producto' });
}

export function PUT () {
    return NextResponse.json({ message: 'actualizando un producto' });
}
