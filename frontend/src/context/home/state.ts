export type Task = Readonly<{
  id: string;
  title: string;
  limitDate?: string | null;
  description: string;
}>;

export type HomeState = Readonly<{
  tasks: ReadonlyArray<Task>;
  loading: boolean;
  errorMessage: string;
}>;

export const initialState: HomeState = {
  tasks: [],
  loading: false,
  errorMessage: ""
};
