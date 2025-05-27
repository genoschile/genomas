import { NextResponse } from 'next/server';
import formidable from 'formidable';
import { IncomingMessage } from 'http';

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req: IncomingMessage): Promise<{ fields: any; files: any }> {
  const form = formidable({ multiples: true });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

export async function POST(req: Request) {
  try {
    // @ts-ignore: because req is not exactly IncomingMessage in app router
    const { fields, files } = await parseForm(req);

    console.log('📁 Archivos recibidos:', files);
    console.log('📝 Metadatos:', fields);

    return NextResponse.json({
      success: true,
      message: 'Archivos procesados correctamente',
      data: { files: Object.keys(files) },
    });

  } catch (error) {
    console.error('⚠️ Error en la API ~ document/upload:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
