import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { Ring } from '../types';

async function updateRing(updatedRing: Ring): Promise<Ring> {
  const response = await fetch(
    `http://localhost:3000/rings/${updatedRing.id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRing),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.error || 'Erro ao criar o anel');
  }

  return response.json();
}

export function useUpdateRing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRing,

    onMutate: async (updatedRing: Ring) => {
      await queryClient.cancelQueries({ queryKey: ['rings'] });

      const previousRings = queryClient.getQueryData<Ring[]>(['rings']) || [];

      queryClient.setQueryData(
        ['rings'],
        previousRings.map((ring) =>
          ring.id === updatedRing.id ? { ...ring, ...updatedRing } : ring,
        ),
      );

      return { previousRings };
    },

    onError: (error, _updatedRing, context) => {
      if (context?.previousRings) {
        queryClient.setQueryData(['rings'], context.previousRings);
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      message.error(errorMessage);
    },

    onSuccess: (updatedRing) => {
      queryClient.setQueryData<Ring[]>(
        ['rings'],
        (oldRings) =>
          oldRings?.map((ring) =>
            ring.id === updatedRing.id ? updatedRing : ring,
          ) || [],
      );

      message.success('Anel atualizado com sucesso!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['rings'] });
    },
  });
}
