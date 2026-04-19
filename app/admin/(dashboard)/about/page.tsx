import ListEditor, { type ListItem } from '../../_components/ListEditor';
import { loadStructuredList } from '../../_lib/load';
import { saveStructuredList } from '../../actions/content';

export default async function AboutPointsPage() {
  const items = await loadStructuredList({
    parentTable: 'about_points',
    i18nTable: 'about_points_i18n',
    parentFk: 'point_id',
    i18nCols: ['title', 'body'],
  });

  async function save(next: ListItem[]) {
    'use server';
    return saveStructuredList({
      parentTable: 'about_points',
      i18nTable: 'about_points_i18n',
      parentFk: 'point_id',
      items: next,
    });
  }

  return (
    <ListEditor
      title="About — 포인트"
      initialItems={items}
      localeFields={[
        { name: 'title', label: '제목', type: 'text' },
        { name: 'body', label: '설명', type: 'textarea' },
      ]}
      emptyLocaleValue={{ title: '', body: '' }}
      onSave={save}
    />
  );
}
