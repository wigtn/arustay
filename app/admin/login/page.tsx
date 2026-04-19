import LoginForm from './LoginForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-1">ARU STAY 관리자</h1>
        <p className="text-sm text-neutral-500 mb-8">로그인해 주세요.</p>
        <LoginForm next={next ?? '/admin'} />
      </div>
    </div>
  );
}
