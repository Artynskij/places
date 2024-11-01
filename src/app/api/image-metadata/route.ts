import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const metadata = await sharp(Buffer.from(buffer)).metadata();

    return NextResponse.json({
      width: metadata.width,
      height: metadata.height,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch image metadata' },
      { status: 500 }
    );
  }
}