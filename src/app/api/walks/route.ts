import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { petId, walkerId } = await request.json()
    const currentTime = new Date().toISOString()

    // insert into Supabase walks table
    const { data, error } = await supabase
      .from('walks')
      .insert([
        {
         pet_id: petId,
          walker_id: walkerId,
          created_at: currentTime,
          completed_at: currentTime  
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Walk completed!',
      data: data[0]
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to save walk' },
      { status: 500 }
    )
  }
}