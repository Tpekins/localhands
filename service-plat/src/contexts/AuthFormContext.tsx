import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthFormData {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  role: 'freelancer' | 'client';
}

interface AuthFormContextProps {
  formData: AuthFormData;
  updateFormData: (data: Partial<AuthFormData>) => void;
  clearFormData: () => void;
}

const initialFormData: AuthFormData = {
  fullName: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  role: 'freelancer'
};

const AuthFormContext = createContext<AuthFormContextProps | undefined>(undefined);

export function AuthFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<AuthFormData>(initialFormData);

  const updateFormData = (data: Partial<AuthFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const clearFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <AuthFormContext.Provider value={{ formData, updateFormData, clearFormData }}>
      {children}
    </AuthFormContext.Provider>
  );
}

export function useAuthForm() {
  const context = useContext(AuthFormContext);
  if (!context) {
    throw new Error('useAuthForm must be used within an AuthFormProvider');
  }
  return context;
}
