import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
    try {
        // 获取 pet_001 的所有遛狗记录
        const { data, error } = await supabase
            .from('walks')
            .select('*')
            .eq('pet_id', 'pet_001')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Supabase error:', error)
            throw error
        }

        return NextResponse.json({
            success: true,
            data: data,
            count: data?.length || 0
        })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch walk logs' },
            { status: 500 }
        )
    }
}