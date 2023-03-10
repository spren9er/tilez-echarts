import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/theme.json');
  const theme = await response.json();

  return { theme };
};
