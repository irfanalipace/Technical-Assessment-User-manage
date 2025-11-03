'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { FixedSizeList as List } from 'react-window';
import clsx from 'clsx';

type Props = { onSelect: (id: string) => void };

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ContactsList({ onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const perPage = 50;

  const { data, error, isLoading, mutate } = useSWR(
    `/api/contacts?q=${encodeURIComponent(
      query
    )}&page=${page}&perPage=${perPage}&sortBy=${sortBy}&dir=${dir}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    setPage(1);
  }, [query, sortBy, dir]);

  const items = data?.items || [];
  const total = data?.total || 0;

 const Row = useCallback(
  ({ index, style }: { index: number; style: React.CSSProperties }) => {

      const c = items[index];
      if (!c) return <div style={style} />;

      return (
        <div
          style={style}
          className="w-full flex justify-between items-center p-2 border-b hover:bg-slate-100"
        >
          <div>
            <div className="font-medium">{c.name}</div>
            <div className="text-sm text-slate-600">{c.email}</div>
          </div>
          <button
            onClick={() => onSelect(c.id)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
          >
            + Add Task
          </button>
        </div>
      );
    },
    [items, onSelect]
  );

  if (error)
    return (
      <div className="p-4 bg-red-50">
        Failed to load. <button onClick={() => mutate()}>Retry</button>
      </div>
    );
  if (isLoading) return <div className="p-4">Loading contacts...</div>;
  if (!items.length) return <div className="p-4">No contacts found.</div>;

  return (
    <div className="bg-white border rounded p-2">
      <div className="flex flex-wrap gap-2 mb-2 w-full">
        <input
          aria-label="Search contacts"
          className="flex-1 min-w-[150px] p-2 border rounded w-full sm:w-auto"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="flex-1 min-w-[150px] p-2 border rounded w-full sm:w-auto"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="city">City</option>
        </select>

        <button
          onClick={() => setDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
          className="flex-1 min-w-[150px] p-2 border rounded w-full sm:w-auto"
          aria-pressed={dir === 'desc'}
        >
          {dir === 'asc' ? 'Asc' : 'Desc'}
        </button>
      </div>

      <div role="list" aria-label="Contacts list" className="h-[400px]">
        <List height={400} itemCount={items.length} itemSize={72} width="100%">
          {Row}
        </List>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="text-sm">{total} contacts</div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 border rounded"
          >
            Prev
          </button>
          <div className="p-2">{page}</div>
          <button onClick={() => setPage((p) => p + 1)} className="p-2 border rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
