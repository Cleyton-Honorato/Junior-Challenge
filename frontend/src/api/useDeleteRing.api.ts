import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { Ring } from '../types';

async function deleteRing(ringId: number) {
  const response = await fetch(`http://localhost:3000/rings/${ringId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao deletar o anel');
  }
}

export function useDeleteRing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRing,

    onMutate: async (ringId) => {
      await queryClient.cancelQueries({ queryKey: ['rings'] });

      const previousRings = queryClient.getQueryData(['rings']);

      queryClient.setQueryData(['rings'], (oldRings: Array<Ring>) =>
        oldRings ? oldRings.filter((ring) => ring.id !== ringId) : [],
      );

      return { previousRings };
    },

    onError: (error: Error, _ringId, context) => {
      if (context?.previousRings) {
        queryClient.setQueryData(['rings'], context.previousRings);
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      message.error(errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['rings'] });
    },
  });
}
