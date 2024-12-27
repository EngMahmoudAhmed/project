import { supabase } from './supabase';

export async function getProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('No user found');
    }

    // First ensure the profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    if (!existingProfile) {
      // Create profile if it doesn't exist
      await supabase.from('profiles').insert([
        { id: user.id, full_name: user.user_metadata.full_name || '' }
      ]);
    }

    // Now get the profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    return {
      full_name: profile?.full_name || '',
      email: user.email
    };
  } catch (error: any) {
    console.error('Profile error:', error);
    throw error;
  }
}