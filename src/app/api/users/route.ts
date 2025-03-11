import { NextRequest, NextResponse } from "next/server";

// Base de datos en memoria (solo para pruebas)
let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

// GET: Obtener usuarios
export async function GET(request: NextRequest) {
  return NextResponse.json(users, { status: 200 });
}

// POST: Crear usuario
export async function POST(request: NextRequest) {
  const { name } = await request.json();

  // Verificar si el usuario ya existe
  const user = users.find((user) => user.name === name);
  if (user) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  // Agregar nuevo usuario
  const newUser = { id: users.length + 1, name };
  users.push(newUser);

  return NextResponse.json({ message: "User added successfully", user: newUser }, { status: 201 });
}

// PUT: Actualizar usuario
export async function PUT(request: NextRequest) {
  const { id, name } = await request.json();
  const idNumber = Number(id);

  // Buscar usuario
  const user = users.find((user) => user.id === idNumber);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Actualizar usuario
  user.name = name;
  return NextResponse.json({ message: "User updated successfully", user }, { status: 200 });
}

// DELETE: Eliminar usuario
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const idNumber = Number(id);

  // Verificar si el usuario existe
  const userIndex = users.findIndex((user) => user.id === idNumber);
  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Eliminar usuario
  users.splice(userIndex, 1);
  return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
}
