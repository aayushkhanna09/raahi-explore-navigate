
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Phone, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type AuthMode = 'login' | 'register';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd authenticate with a backend
    toast({
      title: mode === 'login' ? 'Logged in successfully' : 'Registration successful',
      description: "Welcome to RAही!",
    });
    navigate('/home');
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-heading">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-500 mt-2">
          {mode === 'login' 
            ? 'Enter your credentials to access your account' 
            : 'Fill in your details to get started'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18} />
              </div>
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10" 
                placeholder="John Doe"
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={18} />
            </div>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10" 
              placeholder="example@email.com"
              required
            />
          </div>
        </div>

        {mode === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone size={18} />
              </div>
              <Input 
                id="phone" 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10" 
                placeholder="+91 9876543210"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            {mode === 'login' && (
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
              </a>
            )}
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </div>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10" 
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-500">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
        </span>
        <button 
          onClick={toggleMode} 
          className="text-primary hover:underline font-medium"
        >
          {mode === 'login' ? 'Sign Up' : 'Sign In'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
