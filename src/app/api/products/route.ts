import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/app/products/mockData';

// Simulate network delay to mimic real API behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  try {
    // Simulate processing/network time
    await delay(800);

    // Extract query parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const trending = searchParams.get('trending');
    const search = searchParams.get('search');

    let products = [...mockProducts];

    // Filter by category
    if (category) {
      products = products.filter(p => p.category === category);
    }

    // Filter by trending status
    if (trending === 'true') {
      products = products.filter(p => p.isTrending);
    }

    // Filter by search query
    if (search) {
      const query = search.toLowerCase();
      products = products.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query)
      );
    }

    // Return with proper HTTP status and headers
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
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
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

