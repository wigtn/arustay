import ListEditor, { type ListItem } from '../../_components/ListEditor';
import { loadStructuredList } from '../../_lib/load';
import { saveStructuredList } from '../../actions/content';

export default async function GuestNotesPage() {
  const items = await loadStructuredList({
    parentTable: 'guest_notes',
    i18nTable: 'guest_notes_i18n',
    parentFk: 'note_id',
    i18nCols: ['quote', 'author'],
  });

  async function save(next: ListItem[]) {
    'use server';
    return saveStructuredList({
      parentTable: 'guest_notes',
      i18nTable: 'guest_notes_i18n',
      parentFk: 'note_id',
      items: next,
    });
  }

  return (
    <ListEditor
      title="게스트 후기"
      initialItems={items}
      localeFields={[
        { name: 'quote', label: '후기', type: 'textarea' },
        { name: 'author', label: '작성자', type: 'text' },
      ]}
      emptyLocaleValue={{ quote: '', author: '' }}
      onSave={save}
    />
  );
}
