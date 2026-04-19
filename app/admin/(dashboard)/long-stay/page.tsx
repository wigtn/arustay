import ListEditor, { type ListItem } from '../../_components/ListEditor';
import { loadStructuredList } from '../../_lib/load';
import { saveStructuredList } from '../../actions/content';

export default async function LongStayBulletsPage() {
  const items = await loadStructuredList({
    parentTable: 'long_stay_bullets',
    i18nTable: 'long_stay_bullets_i18n',
    parentFk: 'bullet_id',
    i18nCols: ['text'],
  });

  async function save(next: ListItem[]) {
    'use server';
    return saveStructuredList({
      parentTable: 'long_stay_bullets',
      i18nTable: 'long_stay_bullets_i18n',
      parentFk: 'bullet_id',
      items: next,
    });
  }

  return (
    <ListEditor
      title="Long Stay — 불릿"
      initialItems={items}
      localeFields={[{ name: 'text', label: '불릿 텍스트', type: 'text' }]}
      emptyLocaleValue={{ text: '' }}
      onSave={save}
    />
  );
}
