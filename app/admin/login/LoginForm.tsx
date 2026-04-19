'use client';

import { useState, useTransition } from 'react';
import { signInAction } from '../actions/auth';

export default function LoginForm({ next }: { next: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-4"
      action={(fd) => {
        setError(null);
        startTransition(async () => {
          const result = await signInAction(fd);
          if (result?.error) setError(result.error);
        });
      }}
    >
      <input type="hidden" name="next" value={next} />
      <div>
        <label className="block text-sm mb-1 text-neutral-600">이메일</label>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
        />
      </div>
      <div>
        <label className="block text-sm mb-1 text-neutral-600">비밀번호</label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 disabled:opacity-50"
      >
        {pending ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
}
