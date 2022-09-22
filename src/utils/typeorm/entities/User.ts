import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: 'user', nullable: false })
  @Exclude()
  role: string;

  @OneToMany(() => Item, (item) => item.user)
  items: Promise<Item[]>;
}
