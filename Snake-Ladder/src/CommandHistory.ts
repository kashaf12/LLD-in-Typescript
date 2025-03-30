import { CommandI } from "./CommandI";

export class CommandHistory {
  private commands: CommandI[] = [];

  execute(command: CommandI): void {
    command.execute();
    this.commands.push(command);
  }

  undo(): void {
    if (this.commands.length > 0) {
      const command = this.commands.pop();
      if (command) {
        command.undo();
      }
    }
  }

  clear(): void {
    this.commands = [];
  }
}
