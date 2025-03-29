import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { Ring } from '../types';

async function createRing(newRing: Ring): Promise<Ring> {
  const response = await fetch('http://localhost:3000/rings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRing),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.error || 'Erro ao criar o anel');
  }

  return response.json();
}

export function useCreateRing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRing,

    onMutate: async (newRing: Omit<Ring,'id'>) => {
      await queryClient.cancelQueries({ queryKey: ['rings'] });

      const previousRings = queryClient.getQueryData<Ring[]>(['rings']) || [];

      queryClient.setQueryData(
        ['rings'],
        [...previousRings, { id: Date.now(), ...newRing }],
      );

      return { previousRings };
    },

    onError: (error, _newRing, context) => {
      if (context?.previousRings) {
        queryClient.setQueryData(['rings'], context.previousRings);
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      message.error(errorMessage);
    },

    onSuccess: (newRing) => {
      queryClient.setQueryData<Ring[]>(['rings'], (oldRings) => [
        ...(oldRings || []),
        newRing,
      ]);
      message.success('Anel criado com sucesso!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['rings'] });
    },
  });
}
