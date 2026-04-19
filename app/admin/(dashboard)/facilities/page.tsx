import ListEditor, { type ListItem } from '../../_components/ListEditor';
import { loadStructuredList } from '../../_lib/load';
import { saveStructuredList } from '../../actions/content';

export default async function FacilitiesPage() {
  const items = await loadStructuredList({
    parentTable: 'facilities',
    i18nTable: 'facilities_i18n',
    parentFk: 'facility_id',
    i18nCols: ['name', 'description'],
  });

  async function save(next: ListItem[]) {
    'use server';
    return saveStructuredList({
      parentTable: 'facilities',
      i18nTable: 'facilities_i18n',
      parentFk: 'facility_id',
      items: next,
    });
  }

  return (
    <ListEditor
      title="편의시설"
      initialItems={items}
      localeFields={[
        { name: 'name', label: '이름', type: 'text' },
        { name: 'description', label: '설명', type: 'textarea' },
      ]}
      emptyLocaleValue={{ name: '', description: '' }}
      onSave={save}
    />
  );
}
