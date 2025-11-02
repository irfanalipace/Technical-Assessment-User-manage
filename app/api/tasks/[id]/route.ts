

import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const body = await req.json();
    const updatedTask = db.updateTask(id, body);
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('PATCH /api/tasks/[id] failed:', error);
    return NextResponse.json({ error: 'Task update failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    db.deleteTask(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
}
