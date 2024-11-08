'use client';

import { eachMinuteOfInterval, format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const days = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];

const hours = eachMinuteOfInterval({
  start: new Date().setHours(0, 0, 0),
  end: new Date().setHours(23, 59, 59)
}, { step: 60 });

export default function Page() {
  const { data } = useSession();
  const router = useRouter();

  const [dias, setDias] = useState<string[]>([]);
  const [horarioDeInicio, setHorarioDeInicio] = useState('');
  const [horarioDeFim, setHorarioDeFim] = useState('');

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (dias.length == 0) {
      return alert('Selecione pelo menos um dia.');
    }

    const response = await fetch('http://localhost:3000/api/schedule-free', {
      method: 'POST',
      headers: { 'Cotent-Type': 'application/json' },
      body: JSON.stringify({ horarioDeInicio, horarioDeFim, dias, email: data?.user?.email })
    });

    if (response.ok) {
      router.push('/home');
    }
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <form className="flex flex-col justify-center items-center gap-4" onSubmit={submitForm}>
        <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
          {days.map((day, index) => (
            <button key={index} type="button" onClick={() => {
              if (dias.includes(day)) {
                setDias(prevState => prevState.filter(item => item !== day));
              } else {
                setDias(prevState => [...prevState, day]);
              }
            }} className={`inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative ${dias.includes(day) ? 'bg-orange-400 text-gray-100' : ''}`}
            >
              {day.toUpperCase()}
            </button>
          ))}
        </span>
        
        <div className="flex gap-4">
          <div>
            <label htmlFor="horarioDeInicio" className="block text-sm font-medium text-gray-900">Horário de início</label>

            <select
              name="horarioDeInicio" onChange={(e) => setHorarioDeInicio(e.target.value)} id="horarioDeInicio" className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm" required>
              <option value="">Please select a hour</option>
              {hours.map((hour, index) => <option value={format(hour, 'HH:mm')} key={index}>{format(hour, 'HH:mm')}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="horarioDeFim" className="block text-sm font-medium text-gray-900">Horário de início</label>

            <select name="horarioDeFim" onChange={(e) => setHorarioDeFim(e.target.value)} id="horarioDeFim" className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm" required>
              <option value="">Please select</option>
              {hours.map((hour, index) => <option value={format(hour, 'HH:mm')} key={index}>{format(hour, 'HH:mm')}</option>)}
            </select>
          </div>
        </div>

        <button className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" href="#">
          Salvar
        </button>
      </form>
    </div>
  );
}

