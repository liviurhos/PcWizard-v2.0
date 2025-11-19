'use client';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/buildStore';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
import LoginModal from '@/components/LoginModal';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, savedBuilds, setSavedBuilds } = useStore();
  const [showLogin, setShowLogin] = useState(!user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setShowLogin(false);
      const buildsRef = ref(db, `builds/${user.uid}`);
      const unsubscribe = onValue(buildsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const builds = Object.entries(data).map(([key, value]: any) => ({ id: key, ...value }));
          setSavedBuilds(builds);
        } else {
          setSavedBuilds([]);
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      setLoading(false);
      setShowLogin(true);
    }
  }, [user, setSavedBuilds]);

  if (loading) {
    return <div className="max-w-6xl mx-auto p-8">Încărcare...</div>;
  }

  if (showLogin) {
    return <LoginModal isOpen={true} onClose={() => setShowLogin(false)} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Profile - Build-urile tale</h1>
      <p className="mb-6">Bine ai venit, {user?.email}!</p>
      
      {savedBuilds.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Nu ai niciun build salvat încă. Mergi la <a href="/preview" className="underline">Preview</a> să salvezi unul!
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedBuilds.map((build: any) => (
            <div key={build.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{build.name || 'Build fără nume'}</h3>
              <p className="text-2xl font-bold text-green-600 mb-2">
                {build.totalPrice?.toFixed(2)} {build.country === 'RO' ? 'RON' : 'GBP'}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Creat: {new Date(build.createdAt).toLocaleDateString()}
              </p>
              <div className="space-y-1 text-sm text-gray-600">
                {Object.entries(build).map(([key, value]: any) =>
                  key !== 'name' && key !== 'totalPrice' && key !== 'country' && key !== 'createdAt' && value ? (
                    <p key={key}>{key}: {value.name || value}</p>
                  ) : null
                )}
              </div>
              <button
                onClick={() => {
                  // Load build back into store (opțional)
                  toast.success('Build încărcat!');
                }}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Încarcă în Builder
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}