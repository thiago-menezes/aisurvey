"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

function getStoredNome(): string {
  if (typeof window === 'undefined') return '';
  const stored = sessionStorage.getItem('surveyNome');
  if (stored) {
    sessionStorage.removeItem('surveyNome');
    return stored;
  }
  return '';
}

export default function ObrigadoPage() {
  const router = useRouter();
  const [nome] = useState(() => getStoredNome());

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-fade-in">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
          Obrigado{nome ? `, ${nome}` : ''}!
        </h1>

        <p className="text-xl text-gray-600 mb-8 animate-slide-up">
          Agradecemos por responder nossa pesquisa. Suas respostas são muito importantes para nós.
        </p>

        <button
          onClick={() => router.push('/')}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          Voltar ao Início
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}

