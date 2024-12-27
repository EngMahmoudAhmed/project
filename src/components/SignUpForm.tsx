import React, { useState } from 'react';
import { User, ShieldCheck, Mail, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { AuthLayout } from './ui/AuthLayout';
import { InputWithIcon } from './ui/InputWithIcon';
import { Button } from './ui/Button';

export function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (error) throw error;

      setSuccess(true);
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        icon={ShieldCheck}
        title="Account Created Successfully!"
        subtitle="Your account has been created. You can now sign in."
      >
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-6">
            We've sent you a confirmation email. Please check your inbox and follow the instructions to verify your email address.
          </p>
          <Button onClick={() => window.location.reload()}>
            Go to Sign In
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={ShieldCheck}
      title="Create your account"
      subtitle="Join our e-commerce platform"
    >
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <InputWithIcon
            icon={User}
            label="Full Name"
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <InputWithIcon
            icon={Mail}
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
          <InputWithIcon
            icon={Lock}
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <InputWithIcon
            icon={Lock}
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
        </div>

        <Button loading={loading} loadingText="Creating account...">
          Sign up
        </Button>
      </form>
    </AuthLayout>
  );
}