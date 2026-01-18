import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. check if person exists by id_number (Cal ID or Driver's License)
    const { data: existingPerson, error: searchError } = await supabase
      .from('people')
      .select('id')
      .eq('id_number', body.id)
      .single();

    let person;
    
    if (existingPerson) {
      // Person exists, use their id
      person = existingPerson;
    } else {
      // Person doesn't exist, create new person
      const { data: newPerson, error: createError } = await supabase
        .from('people')
        .insert({
          email: body.email,
          full_name: body.name,
          phone: body.phoneNumber,
        })
        .select()
        .single();

      if (createError || !newPerson) {
        console.error('Person creation error:', createError);
        return NextResponse.json({ error: 'Failed to create person' }, { status: 400 });
      }

      person = newPerson;
    }

    // 2. create checkout with person id
    const { data: checkout, error: checkoutError } = await supabase
      .from('checkouts')
      .insert({
        person_id: person.id,
        destination: body.destination,
        id_number: body.id,
      })
      .select()
      .single();

    if (checkoutError || !checkout) {
      console.error('Checkout error:', checkoutError);
      return NextResponse.json({ error: 'Failed to create checkout' }, { status: 400 });
    }

    return NextResponse.json({ checkout_id: checkout.id });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
