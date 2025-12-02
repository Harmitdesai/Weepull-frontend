import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { data, email } = await request.json();
    const post_id = request.nextUrl.searchParams.get('post_id');
    
    if (!email || !data) {
      return NextResponse.json(
        { success: false, message: 'Email and data are required' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_API_URL;
    const response = await fetch(`${backendUrl}/dataUpload/text?post_id=${post_id ?? "-1"}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, email }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error in dataUpload text API route:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
