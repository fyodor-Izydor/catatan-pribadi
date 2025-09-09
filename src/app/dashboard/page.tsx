"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [editingNote, setEditingNote] = useState<any | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const router = useRouter();

  // Fetch catatan berdasarkan email user login
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const email = user.email || "";
      setUserEmail(email);

      const unsub = onSnapshot(collection(db, "notes"), (snapshot) => {
        const userNotes = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            title: doc.data().title || "",
            content: doc.data().content || "",
            email: doc.data().email || "",
          }))
          .filter((note) => note.email === email);

        setNotes(userNotes.reverse()); // catatan terbaru di atas
      });

      return () => unsub();
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleAddNote = async () => {
    if (!newTitle.trim() || !newNote.trim()) return;
    await addDoc(collection(db, "notes"), {
      title: newTitle,
      content: newNote,
      email: userEmail,
    });
    setNewTitle("");
    setNewNote("");
    setOverlayOpen(false);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteDoc(doc(db, "notes", id));
  };

  const handleUpdateNote = async () => {
    if (editingNote && editingNote.title && editingNote.content) {
      await updateDoc(doc(db, "notes", editingNote.id), {
        title: editingNote.title,
        content: editingNote.content,
      });
      setEditingNote(null);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          📒 Catatan Pribadi {userEmail && `si ${userEmail}`}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <button
        onClick={() => setOverlayOpen(true)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Tambah Catatan
      </button>

      {overlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Tambah Catatan</h2>
            <input
              type="text"
              placeholder="Judul"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Isi catatan"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOverlayOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleAddNote}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {editingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Edit Catatan</h2>
            <input
              type="text"
              value={editingNote.title}
              onChange={(e) =>
                setEditingNote({ ...editingNote, title: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <textarea
              value={editingNote.content}
              onChange={(e) =>
                setEditingNote({ ...editingNote, content: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingNote(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleUpdateNote}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 mt-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-yellow-100 p-4 rounded shadow space-y-2"
          >
            <h3 className="text-lg font-bold">{note.title}</h3>
            <p>{note.content}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingNote(note)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
