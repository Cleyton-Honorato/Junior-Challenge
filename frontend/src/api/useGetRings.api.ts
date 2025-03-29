import { useQuery } from '@tanstack/react-query';
import { Ring } from '../types';

async function fetchRings(): Promise<Array<Ring>> {
  const response = await fetch('http://localhost:3000/rings');
  if (!response.ok) {
    throw new Error('Failed to fetch rings');
  }
  return response.json();
}

export const useGetRings = () => {
  return useQuery({ queryKey: ['rings'], queryFn: fetchRings });
};
