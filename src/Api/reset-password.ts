import { supabase } from '../supabase.config';

export const resetPassword = (email: string) => {
  const redirectTo = 'https://example.com/reset-password';

  supabase.auth
    .resetPasswordForEmail(email, { redirectTo })
    .then(() => console.log('Password reset email sent'))
    .catch((error: Error) => console.error(error));
};
