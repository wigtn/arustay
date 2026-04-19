#!/usr/bin/env node
/**
 * Create an admin user via Supabase Admin API.
 * Run: node --env-file=.env scripts/create-admin.mjs <email> <password>
 */
import { createClient } from '@supabase/supabase-js';

const [, , emailArg, passwordArg] = process.argv;
const email = emailArg ?? 'test@arustay.com';
const password = passwordArg ?? '11111111';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const sb = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data, error } = await sb.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (error) {
  if (error.message?.includes('already') || error.status === 422) {
    console.log(`ℹ️  User ${email} already exists. Updating password…`);
    const { data: list, error: listErr } = await sb.auth.admin.listUsers();
    if (listErr) {
      console.error(listErr);
      process.exit(1);
    }
    const existing = list.users.find((u) => u.email === email);
    if (!existing) {
      console.error('Could not find existing user to update.');
      process.exit(1);
    }
    const { error: upErr } = await sb.auth.admin.updateUserById(existing.id, { password });
    if (upErr) {
      console.error(upErr);
      process.exit(1);
    }
    console.log(`✅ Password updated for ${email}`);
    process.exit(0);
  }
  console.error('❌ Failed:', error);
  process.exit(1);
}

console.log(`✅ Created admin user:`);
console.log(`   email:    ${email}`);
console.log(`   password: ${password}`);
console.log(`   user id:  ${data.user.id}`);
