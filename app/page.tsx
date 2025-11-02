'use client';
import React, { useState, useEffect } from 'react';
import ContactsList from '../components/ContactsList';
import TaskManager from '../components/TaskManager';

export default function Page() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1">
        <ContactsList onSelect={(id) => setSelectedContact(id)} />
      </div>
      <div className="lg:col-span-2">
        {selectedContact ? (
          <TaskManager contactId={selectedContact} />
        ) : (
          <div className="p-6 border rounded bg-white">Select a contact to manage tasks.</div>
        )}
      </div>
    </div>
  );
}
