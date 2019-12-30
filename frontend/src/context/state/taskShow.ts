export type State = Readonly<{
  task: Task | null;
}>;

export type Task = Readonly<{
  id: string;
  title: string;
  description: string;
}>;

export const initialState: State = {
  task: null
};
