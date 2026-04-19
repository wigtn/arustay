import ListEditor, { type ListItem } from '../../_components/ListEditor';
import { loadStructuredList } from '../../_lib/load';
import { saveStructuredList } from '../../actions/content';

export default async function FaqPage() {
  const items = await loadStructuredList({
    parentTable: 'faq',
    i18nTable: 'faq_i18n',
    parentFk: 'faq_id',
    i18nCols: ['question', 'answer'],
  });

  async function save(next: ListItem[]) {
    'use server';
    return saveStructuredList({
      parentTable: 'faq',
      i18nTable: 'faq_i18n',
      parentFk: 'faq_id',
      items: next,
    });
  }

  return (
    <ListEditor
      title="FAQ"
      initialItems={items}
      localeFields={[
        { name: 'question', label: '질문', type: 'text' },
        { name: 'answer', label: '답변', type: 'textarea' },
      ]}
      emptyLocaleValue={{ question: '', answer: '' }}
      onSave={save}
    />
  );
}
