export type Task = Readonly<{
  id: string;
  title: string;
  limitDate?: string | null;
  description: string;
}>;
