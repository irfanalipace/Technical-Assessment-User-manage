'use client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function TaskManager({ contactId }: { contactId: string }) {
  const { data, error, mutate } = useSWR(`/api/tasks?contactId=${contactId}`, fetcher);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const tasks = data?.tasks || [];

  const startEdit = (t: any) => {
    setEditingId(t.id);
    setEditTitle(t.title);
  };

  const saveEdit = async (id: string) => {
    const updated = {
      tasks: tasks.map((t) => (t.id === id ? { ...t, title: editTitle } : t)),
    };
    mutate(updated, false);
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title: editTitle }),
      });
      mutate();
      setEditingId(null);
    } catch (e) {
      console.error('Edit failed:', e);
      mutate();
    }
  };

  const toggle = async (id: string, current: boolean) => {
    const updated = {
      tasks: tasks.map((t) => (t.id === id ? { ...t, completed: !current } : t)),
    };
    mutate(updated, false); // instantly update UI

    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ completed: !current }),
      });
      mutate(); // revalidate from server
    } catch (e) {
      console.error('Toggle failed:', e);
      mutate(); // rollback if failed
    }
  };

  // const toggle = async (id: string, current: boolean) => {
  //   const updated = {
  //     tasks: tasks.map((t) => (t.id === id ? { ...t, completed: !current } : t)),
  //   };
  //   mutate(updated, false);
  //   try {
  //     await fetch(`/api/tasks/${id}`, {
  //       method: 'PATCH',
  //       headers: { 'content-type': 'application/json' },
  //       body: JSON.stringify({ completed: !current }),
  //     });
  //     mutate();
  //   } catch (e) {
  //     console.error('Toggle failed:', e);
  //     mutate();
  //   }
  // };

  const remove = async (id: string) => {
    mutate({ tasks: tasks.filter((t) => t.id !== id) }, false);
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      mutate();
    } catch (e) {
      console.error('Delete failed:', e);
      mutate();
    }
  };

  if (error)
    return (
      <div className="p-4 bg-red-50">
        Failed to load tasks. <button onClick={() => mutate()}>Retry</button>
      </div>
    );

  if (!data) return <div className="p-4">Loading tasks...</div>;

  return (
    <div className="bg-white border rounded p-4">
      <h2 className="font-semibold mb-2">Tasks for Contact</h2>

      {tasks.length === 0 ? (
        <div className="p-4 text-sm text-slate-600">No tasks found for this contact.</div>
      ) : (
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="p-2 border rounded flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex flex-col">
                {editingId === t.id ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border p-1 rounded"
                  />
                ) : (
                  <div className={`font-medium ${t.completed ? 'line-through text-gray-400' : ''}`}>
                    {t.title}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggle(t.id, t.completed)}
                  className="w-5 h-5"
                />

                {editingId === t.id ? (
                  <button
                    onClick={() => saveEdit(t.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(t)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => remove(t.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
