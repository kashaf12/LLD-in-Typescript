export class Group {
  private userIds: string[];
  private id: string;
  private title: string;
  private description: string;

  constructor(
    id: string,
    title: string,
    description: string,
    userIds: string[] = []
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userIds = userIds;
  }

  public addUserId(id: string) {
    this.userIds.push(id);
  }

  public getUserIds() {
    return this.userIds;
  }
}
