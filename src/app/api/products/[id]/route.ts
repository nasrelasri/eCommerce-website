import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/app/products/mockData';

// Simulate network delay to mimic real API behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Simulate processing/network time
    await delay(500);

    const { id } = await params;
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
          message: `No product found with ID: ${id}`
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
      timestamp: new Date().toISOString()
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

