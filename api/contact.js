import supabase from './db-client.js';

export default async function handler(req, res) {
  // CORS and Content-Type Headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, email, company, message } = body;

    // Strict field validation
    const trimmedName = (name || '').trim();
    const trimmedEmail = (email || '').trim();
    const trimmedMessage = (message || '').trim();
    const trimmedCompany = (company || '').trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please fill in all required fields: Name, Email, and Message.' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide a valid email address.' 
      });
    }

    // Insert data into Supabase if client is initialized
    if (supabase) {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: trimmedName,
            email: trimmedEmail,
            company: trimmedCompany,
            message: trimmedMessage,
          },
        ])
        .select();

      if (error) {
        console.error('Supabase insertion error:', error);
        // Fallback log so submission isn't dropped silently
        console.log('Inquiry payload fallback log:', { name: trimmedName, email: trimmedEmail, company: trimmedCompany, message: trimmedMessage });
      }
    } else {
      console.warn('Supabase client not initialized (missing environment variables). Inquiry logged:', {
        name: trimmedName,
        email: trimmedEmail,
        company: trimmedCompany,
        message: trimmedMessage,
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Inquiry submitted successfully.' 
    });
  } catch (error) {
    console.error('Internal server error in contact API:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Unable to process your inquiry at this time. Please try again later.' 
    });
  }
}
