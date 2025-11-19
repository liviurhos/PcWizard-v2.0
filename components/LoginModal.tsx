'use client';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/buildStore';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { setUser } = useStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        onClose();
      }
    });
    return unsubscribe;
  }, [setUser, onClose]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        toast.success('Cont creat cu succes!');
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        toast.success('Logat cu succes!');
      }
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Eroare la autentificare!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? 'Creează cont' : 'Login'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parolă"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
          >
            {isRegister ? 'Creează cont' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          {isRegister ? 'Ai deja cont?' : 'Nu ai cont?'}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 font-semibold ml-1"
          >
            {isRegister ? 'Login' : 'Creează unul'}
          </button>
        </p>
        <button
          onClick={onClose}
          className="w-full mt-4 text-gray-500 hover:text-gray-700"
        >
          Închide
        </button>
      </div>
    </div>
  );
}