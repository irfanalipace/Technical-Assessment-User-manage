import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

function randomFail() {
  // 10% chance to fail to simulate flaky network
  return Math.random() < 0.1
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const contactId = url.searchParams.get('contactId')
  if (!contactId) return NextResponse.json({ tasks: [] })
  const tasks = db.getTasksForContact(contactId)
  return NextResponse.json({ tasks })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { contactId, title, notes } = body
  if (!contactId || !title) return NextResponse.json({ error: 'Invalid' }, { status: 400 })
  if (randomFail()) return NextResponse.json({ error: 'simulated failure' }, { status: 500 })
  const t = db.createTask({ contactId, title, notes })
  return NextResponse.json(t)
}
