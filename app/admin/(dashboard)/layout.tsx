import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { signOutAction } from '../actions/auth';

const SECTIONS: { href: string; label: string }[] = [
  { href: '/admin', label: '대시보드' },
  { href: '/admin/texts', label: '텍스트 (스칼라)' },
  { href: '/admin/about', label: 'About — 포인트' },
  { href: '/admin/rooms', label: '객실' },
  { href: '/admin/long-stay', label: 'Long Stay — 불릿' },
  { href: '/admin/facilities', label: '편의시설' },
  { href: '/admin/location', label: 'Location — 접근성' },
  { href: '/admin/faq', label: 'FAQ' },
  { href: '/admin/guest-notes', label: '게스트 후기' },
  { href: '/admin/images', label: '이미지' },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r border-neutral-200 bg-white flex flex-col">
        <div className="px-5 py-5 border-b border-neutral-200">
          <div className="text-sm font-semibold">ARU STAY · Admin</div>
          <div className="text-xs text-neutral-500 mt-1 truncate">{user?.email}</div>
        </div>
        <nav className="flex-1 py-3">
          <ul className="space-y-0.5 px-2">
            {SECTIONS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="block px-3 py-2 rounded-md text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-3 border-t border-neutral-200 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="block text-center px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900"
          >
            사이트 보기 →
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-100 rounded-md"
            >
              로그아웃
            </button>
          </form>
        </div>
      </aside>
      <main className="p-8 max-w-5xl">{children}</main>
    </div>
  );
}
