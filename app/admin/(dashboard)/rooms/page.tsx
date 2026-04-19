import ListEditor, { type ListItem } from '../../_components/ListEditor';
import { loadStructuredList } from '../../_lib/load';
import { saveStructuredList } from '../../actions/content';

export default async function RoomsPage() {
  const items = await loadStructuredList({
    parentTable: 'rooms',
    i18nTable: 'rooms_i18n',
    parentFk: 'room_id',
    parentExtraCols: ['slug', 'size', 'image_key'],
    i18nCols: ['name', 'capacity', 'description', 'amenities'],
  });

  async function save(next: ListItem[]) {
    'use server';
    // Map field name 'description' back to DB column (same).
    // For rooms, parent_extra contains: slug, size, image_key
    const shaped = next.map((it) => ({
      ...it,
      parent_extra: {
        slug: it.parent_extra?.slug ?? '',
        size: it.parent_extra?.size ?? '',
        image_key: it.parent_extra?.image_key || null,
      } as Record<string, unknown>,
    }));
    return saveStructuredList({
      parentTable: 'rooms',
      i18nTable: 'rooms_i18n',
      parentFk: 'room_id',
      items: shaped as ListItem[],
    });
  }

  return (
    <ListEditor
      title="객실"
      initialItems={items}
      parentFields={[
        { name: 'slug', label: 'Slug (영문 소문자, 고유)', type: 'text' },
        { name: 'size', label: '크기 (예: 14 m²)', type: 'text' },
        { name: 'image_key', label: '이미지 키 (예: room.single — 이미지 관리에서 같은 키로 업로드)', type: 'text' },
      ]}
      localeFields={[
        { name: 'name', label: '객실명', type: 'text' },
        { name: 'capacity', label: '정원', type: 'text' },
        { name: 'description', label: '설명', type: 'textarea' },
        { name: 'amenities', label: '편의시설 (쉼표 구분)', type: 'tags' },
      ]}
      emptyParent={{ slug: '', size: '', image_key: '' }}
      emptyLocaleValue={{ name: '', capacity: '', description: '', amenities: [] }}
      onSave={save}
    />
  );
}
