import React, { useState, useEffect } from 'react';

export default function Home() {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('workouts');
    return saved ? JSON.parse(saved) : [];
  });

  const [task, setTask] = useState({ name: '', sets: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name || !task.sets) return;

    if (editId) {
      setWorkouts(
        workouts.map((w) => (w.id === editId ? { ...task, id: editId } : w))
      );
      setEditId(null);
    } else {
      setWorkouts([...workouts, { ...task, id: Date.now() }]);
    }
    setTask({ name: '', sets: '' });
  };

  const handleEdit = (workout) => {
    setTask({ name: workout.name, sets: workout.sets });
    setEditId(workout.id);
  };

  const handleDelete = (id) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Antrenman & Hipertrofi Takip
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Egzersiz Adı (Örn: Dumbbell Shrug)"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Set / Tekrar (Örn: 4x12)"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={task.sets}
            onChange={(e) => setTask({ ...task, sets: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {editId ? 'Güncelle' : 'Egzersiz Ekle'}
          </button>
        </form>

        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Eklenen Egzersizler
        </h2>
        {workouts.length === 0 ? (
          <p className="text-gray-400 text-center py-4">
            Henüz antrenman eklenmedi.
          </p>
        ) : (
          <ul className="space-y-3">
            {workouts.map((workout) => (
              <li
                key={workout.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border shadow-sm"
              >
                <div>
                  <span className="font-bold text-gray-800 block">
                    {workout.name}
                  </span>
                  <span className="text-sm text-blue-600 font-medium">
                    {workout.sets}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(workout)}
                    className="bg-amber-400 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-amber-500 transition"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(workout.id)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-red-600 transition"
                  >
                    Sil
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
