import { Ctx, Field, ID, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MyContext } from "../types/Context";
import { CodeReviewQuestion } from "./CodeReviewQuestion";
import { User } from "./User";

@Entity()
@ObjectType()
export class CodeReviewPost {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => [String])
  @Column({ type: "text", array: true })
  topics: string[];

  @Field()
  @Column({ type: "text" })
  title: string;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field()
  @Column({ type: "text" })
  repo: string;

  @Field()
  @Column({ type: "text" })
  commitId: string;

  @Field()
  @Column({ type: "text" })
  repoOwner: string;

  @OneToMany(() => CodeReviewQuestion, crq => crq.post)
  questions: Promise<CodeReviewQuestion[]>;

  @Field()
  @Column("uuid")
  creatorId: string;

  @ManyToOne(() => User, user => user.codeReviewQuestions)
  creatorConnection: Promise<User>;

  @Field(() => User)
  creator(@Ctx() { userLoader }: MyContext): Promise<User> {
    return userLoader.load(this.creatorId);
  }

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @Field(() => Int)
  numQuestions: number;
}
