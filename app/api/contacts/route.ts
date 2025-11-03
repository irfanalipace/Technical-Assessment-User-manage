// import { NextResponse } from 'next/server'
// import { db } from '../../../lib/db'

// export async function GET(req: Request) {
//   const url = new URL(req.url)
//   const q = url.searchParams.get('q') ?? ''
//   const page = Number(url.searchParams.get('page') ?? '1')
//   const perPage = Number(url.searchParams.get('perPage') ?? '50')
//   const sortBy = url.searchParams.get('sortBy') ?? 'name'
//   const dir = url.searchParams.get('dir') ?? 'asc'
//   const result = db.queryContacts({ q, page, perPage, sortBy, dir })
//   return NextResponse.json(result)
// }


import { NextResponse } from 'next/server'
import { db, Contact } from '../../../lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q') ?? ''
  const page = Number(url.searchParams.get('page') ?? '1')
  const perPage = Number(url.searchParams.get('perPage') ?? '50')

  // ✅ Validate sortBy against Contact keys
  const validSortKeys: (keyof Contact)[] = ['id', 'name', 'email', 'phone', 'city']
  const sortByParam = url.searchParams.get('sortBy') ?? 'name'
  const sortBy = validSortKeys.includes(sortByParam as keyof Contact)
    ? (sortByParam as keyof Contact)
    : 'name'

  // ✅ Fix: ensure dir is strictly "asc" or "desc"
  const dirParam = url.searchParams.get('dir')
  const dir: 'asc' | 'desc' =
    dirParam === 'asc' || dirParam === 'desc' ? dirParam : 'asc'

  const result = db.queryContacts({ q, page, perPage, sortBy, dir })
  return NextResponse.json(result)
}

