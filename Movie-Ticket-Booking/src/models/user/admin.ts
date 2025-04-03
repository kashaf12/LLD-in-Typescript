import { Account } from "./account";
import { Customer } from "./customer";
import { Movie } from "../show/movie";
import { Show } from "../show/show";
import { AccountStatus } from "../../types/enums";

export class Admin extends Account {
  constructor(id: string, name: string, email: string, password: string) {
    super(id, name, email, password);
  }

  public addMovie(movie: Movie): boolean {
    console.log(`Admin ${this.getName()} added movie: ${movie.getTitle()}`);
    return true;
  }

  public addShow(show: Show): boolean {
    console.log(
      `Admin ${this.getName()} added show for movie: ${show
        .getMovie()
        .getTitle()}`
    );
    return true;
  }

  public blockUser(customer: Customer): boolean {
    customer.setStatus(AccountStatus.BLOCKED);
    console.log(`Admin ${this.getName()} blocked user: ${customer.getName()}`);
    return true;
  }
}
