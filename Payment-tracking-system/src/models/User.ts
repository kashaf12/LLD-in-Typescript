export class User {
  private id: string;
  private name: string;
  private image: string;

  public constructor(id: string, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}
