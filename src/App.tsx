import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import { ProductsPage } from './components/ProductsPage';
import { CartProvider } from './context/CartContext';
import { supabase } from './lib/supabase';

export default function App() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated) {
    return (
      <CartProvider>
        <Toaster position="top-right" />
        <ProductsPage />
      </CartProvider>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <nav className="p-4 flex justify-end">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </nav>
        {isSignUp ? (
          <SignUpForm />
        ) : (
          <SignInForm onSignIn={() => setIsAuthenticated(true)} />
        )}
      </div>
    </>
  );
}