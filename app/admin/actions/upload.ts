'use server';

import { updateTag, revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { SITE_CONTENT_TAG } from '@/lib/content';

const ALLOWED_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function uploadImageAction(formData: FormData) {
  const key = String(formData.get('key') ?? '').trim();
  const alt = String(formData.get('alt') ?? '').trim();
  const file = formData.get('file') as File | null;

  if (!key) return { error: 'key를 입력해 주세요.' };
  if (!file || file.size === 0) return { error: '파일을 선택해 주세요.' };
  if (!/^[a-z0-9][a-z0-9._-]*$/i.test(key)) {
    return { error: 'key는 영문/숫자/점/하이픈만 허용돼요 (예: hero, room.single).' };
  }
  if (file.size > MAX_BYTES) {
    return { error: `파일이 너무 큽니다. 최대 ${MAX_BYTES / 1024 / 1024}MB.` };
  }
  const safeExt = ALLOWED_MIME[file.type];
  if (!safeExt) {
    return { error: '허용되는 형식은 JPG, PNG, WEBP, AVIF 입니다. (SVG 불가)' };
  }

  const sb = await createSupabaseServerClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return { error: '로그인이 필요합니다.' };

  const path = `${key}-${Date.now()}.${safeExt}`;

  const uploadRes = await sb.storage.from('site-images').upload(path, file, {
    contentType: file.type,
    cacheControl: '3600',
    upsert: false,
  });
  if (uploadRes.error) return { error: uploadRes.error.message };

  const { data: publicUrl } = sb.storage.from('site-images').getPublicUrl(path);

  const { error: upsertErr } = await sb
    .from('site_images')
    .upsert({ key, url: publicUrl.publicUrl, alt_text: alt }, { onConflict: 'key' });
  if (upsertErr) return { error: upsertErr.message };

  updateTag(SITE_CONTENT_TAG);
  revalidatePath('/', 'layout');
  return { ok: true as const, url: publicUrl.publicUrl };
}
