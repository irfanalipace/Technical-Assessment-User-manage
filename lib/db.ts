// import { v4 as uuid } from 'uuid';

// export type Contact = {
//   id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   city?: string;
// };

// export type Task = {
//   id: string;
//   contactId: string;
//   title: string;
//   completed: boolean;
//   notes?: string;
//   updatedAt: string;
// };

// const CONTACTS: Contact[] = [];
// const TASKS: Task[] = [];

// function seed(n = 10000) {
//   if (CONTACTS.length) return;
//   for (let i = 0; i < n; i++) {
//     CONTACTS.push({
//       id: uuid(),
//       name: `Contact ${i + 1}`,
//       email: `contact${i + 1}@example.com`,
//       phone: `+92${Math.floor(3000000000 + Math.random() * 900000000)}`,
//       city: ['Lahore', 'Karachi', 'Islamabad', 'Peshawar'][i % 4],
//     });
//   }
//   // add a few tasks
//   for (let i = 0; i < 200; i++) {
//     TASKS.push({
//       id: uuid(),
//       contactId: CONTACTS[i].id,
//       title: `Task for ${CONTACTS[i].name}`,
//       completed: Math.random() > 0.5,
//       notes: 'Auto seed task',
//       updatedAt: new Date().toISOString(),
//     });
//   }
// }

// seed(10000);

// export const db = {
//   contacts: CONTACTS,
//   tasks: TASKS,
//   // simple query API
//   queryContacts({ q, sortBy = 'name', dir = 'asc', page = 1, perPage = 50 }: any) {
//     let list = CONTACTS;
//     if (q) {
//       const qq = q.toLowerCase();
//       list = list.filter(
//         (c) =>
//           c.name.toLowerCase().includes(qq) ||
//           c.email.toLowerCase().includes(qq) ||
//           (c.city || '').toLowerCase().includes(qq)
//       );
//     }
//     list = list.sort((a, b) => {
//       const A = (a[sortBy] || '').toString().toLowerCase();
//       const B = (b[sortBy] || '').toString().toLowerCase();
//       if (A === B) return 0;
//       return dir === 'asc' ? (A < B ? -1 : 1) : A < B ? 1 : -1;
//     });
//     const total = list.length;
//     const start = (page - 1) * perPage;
//     const pageItems = list.slice(start, start + perPage);
//     return { total, items: pageItems };
//   },

//   getTasksForContact(contactId: string) {
//     return TASKS.filter((t) => t.contactId === contactId);
//   },
//   createTask(payload: { contactId: string; title: string; notes?: string }) {
//     const t = {
//       id: uuid(),
//       contactId: payload.contactId,
//       title: payload.title,
//       notes: payload.notes,
//       completed: false,
//       updatedAt: new Date().toISOString(),
//     };
//     TASKS.unshift(t);
//     return t;
//   },
//   updateTask(id: string, patch: Partial<Task>) {
//     const idx = TASKS.findIndex((t) => t.id === id);
//     if (idx === -1) throw new Error('Task not found');
//     TASKS[idx] = { ...TASKS[idx], ...patch, updatedAt: new Date().toISOString() };
//     return TASKS[idx];
//   },
//   deleteTask(id: string) {
//     const idx = TASKS.findIndex((t) => t.id === id);
//     if (idx === -1) throw new Error('Task not found');
//     TASKS.splice(idx, 1);
//     return true;
//   },
// };



import { v4 as uuid } from 'uuid';

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
};

export type Task = {
  id: string;
  contactId: string;
  title: string;
  completed: boolean;
  notes?: string;
  updatedAt: string;
};

const CONTACTS: Contact[] = [];
const TASKS: Task[] = [];

function seed(n = 10000) {
  if (CONTACTS.length) return;
  for (let i = 0; i < n; i++) {
    CONTACTS.push({
      id: uuid(),
      name: `Contact ${i + 1}`,
      email: `contact${i + 1}@example.com`,
      phone: `+92${Math.floor(3000000000 + Math.random() * 900000000)}`,
      city: ['Lahore', 'Karachi', 'Islamabad', 'Peshawar'][i % 4],
    });
  }
  // add a few tasks
  for (let i = 0; i < 200; i++) {
    TASKS.push({
      id: uuid(),
      contactId: CONTACTS[i].id,
      title: `Task for ${CONTACTS[i].name}`,
      completed: Math.random() > 0.5,
      notes: 'Auto seed task',
      updatedAt: new Date().toISOString(),
    });
  }
}

seed(10000);

export const db = {
  contacts: CONTACTS,
  tasks: TASKS,

  // simple query API
  queryContacts({
    q,
    sortBy = 'name',
    dir = 'asc',
    page = 1,
    perPage = 50,
  }: {
    q?: string;
    sortBy?: keyof Contact;
    dir?: 'asc' | 'desc';
    page?: number;
    perPage?: number;
  }) {
    let list = CONTACTS;

    if (q) {
      const qq = q.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(qq) ||
          c.email.toLowerCase().includes(qq) ||
          (c.city || '').toLowerCase().includes(qq)
      );
    }

    list = list.sort((a, b) => {
      const A = (a[sortBy] ?? '').toString().toLowerCase();
      const B = (b[sortBy] ?? '').toString().toLowerCase();
      if (A === B) return 0;
      return dir === 'asc' ? (A < B ? -1 : 1) : A < B ? 1 : -1;
    });

    const total = list.length;
    const start = (page - 1) * perPage;
    const pageItems = list.slice(start, start + perPage);
    return { total, items: pageItems };
  },

  getTasksForContact(contactId: string) {
    return TASKS.filter((t) => t.contactId === contactId);
  },

  createTask(payload: { contactId: string; title: string; notes?: string }) {
    const t: Task = {
      id: uuid(),
      contactId: payload.contactId,
      title: payload.title,
      notes: payload.notes,
      completed: false,
      updatedAt: new Date().toISOString(),
    };
    TASKS.unshift(t);
    return t;
  },

  updateTask(id: string, patch: Partial<Task>) {
    const idx = TASKS.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Task not found');
    TASKS[idx] = { ...TASKS[idx], ...patch, updatedAt: new Date().toISOString() };
    return TASKS[idx];
  },

  deleteTask(id: string) {
    const idx = TASKS.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Task not found');
    TASKS.splice(idx, 1);
    return true;
  },
};
