export interface CommandI {
  execute(): void;
  undo(): void;
}
