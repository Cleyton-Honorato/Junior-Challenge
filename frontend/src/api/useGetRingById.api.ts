import { useQuery } from '@tanstack/react-query';
import { Ring } from '../types';

async function fetchRingById(id: number): Promise<Ring> {
  const response = await fetch(`http://localhost:3000/rings/${id}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar o anel com ID ${id}`);
  }

  return response.json();
}

export function useGetRingById(id: number) {
  return useQuery({
    queryKey: ['ring', id],
    queryFn: () => fetchRingById(id),
    enabled: !!id,
  });
}
