import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q') ?? ''
  const page = Number(url.searchParams.get('page') ?? '1')
  const perPage = Number(url.searchParams.get('perPage') ?? '50')
  const sortBy = url.searchParams.get('sortBy') ?? 'name'
  const dir = url.searchParams.get('dir') ?? 'asc'
  const result = db.queryContacts({ q, page, perPage, sortBy, dir })
  return NextResponse.json(result)
}
