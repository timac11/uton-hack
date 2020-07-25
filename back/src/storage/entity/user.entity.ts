import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Form} from "./form.entity";

@Unique(["email"])
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({nullable: true})
  public wallet: string;

  @Column()
  public password: string;

  @Column()
  public email: string;

  @OneToMany(() => Form, form => form.owner)
  public forms: Form[];

  @OneToMany(() => Form, form => form.reviewer)
  public formsReviews: Form[];

  @ManyToMany(() => Form, form => form.shareToUsers)
  public shares: Form[];
}
