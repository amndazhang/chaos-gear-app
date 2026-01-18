import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  // 1. upsert person
  const { data: person } = await supabase
    .from('people')
    .upsert({
      email: body.email,
      full_name: body.name,
      phone: body.phoneNumber,
    })
    .select()
    .single();

  // 2. create checkout
  const { data: checkout } = await supabase
    .from('checkouts')
    .insert({
      person_id: person.id,
      destination: body.destination,
      id_number: body.id,
    })
    .select()
    .single();

  return NextResponse.json({ checkout_id: checkout.id });
}
