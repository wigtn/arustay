import { createSupabaseServerClient } from '@/lib/supabase/server';
import { deleteSiteImage, saveSiteImage } from '../../actions/content';
import { uploadImageAction } from '../../actions/upload';
import ImagesEditor from './ImagesEditor';

// Suggested image slots — admin can still create arbitrary keys.
const SUGGESTED_KEYS = [
  'hero',
  'about',
  'room.single',
  'room.double',
  'room.twin',
  'room.family',
];

export default async function ImagesPage() {
  const sb = await createSupabaseServerClient();
  const { data } = await sb.from('site_images').select('key, url, alt_text').order('key');

  return (
    <ImagesEditor
      initial={data ?? []}
      suggestedKeys={SUGGESTED_KEYS}
      uploadAction={uploadImageAction}
      saveAction={saveSiteImage}
      deleteAction={deleteSiteImage}
    />
  );
}
