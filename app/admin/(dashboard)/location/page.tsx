import ListEditor, { type ListItem } from '../../_components/ListEditor';
import { loadStructuredList } from '../../_lib/load';
import { saveStructuredList } from '../../actions/content';

export default async function LocationAccessPage() {
  const items = await loadStructuredList({
    parentTable: 'location_access',
    i18nTable: 'location_access_i18n',
    parentFk: 'access_id',
    i18nCols: ['place', 'time'],
  });

  async function save(next: ListItem[]) {
    'use server';
    return saveStructuredList({
      parentTable: 'location_access',
      i18nTable: 'location_access_i18n',
      parentFk: 'access_id',
      items: next,
    });
  }

  return (
    <ListEditor
      title="Location — 접근성"
      initialItems={items}
      localeFields={[
        { name: 'place', label: '장소', type: 'text' },
        { name: 'time', label: '소요 시간', type: 'text' },
      ]}
      emptyLocaleValue={{ place: '', time: '' }}
      onSave={save}
    />
  );
}
