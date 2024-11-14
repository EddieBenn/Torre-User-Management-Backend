import { BaseEntity, GenderEnum, RolesEnum } from 'src/base.entity';
import { BeforeInsert, Column, Entity, Unique } from 'typeorm';

@Unique(['email'])
@Unique(['phone'])
@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @BeforeInsert()
  fieldsToModify() {
    this.city = this.city.toLowerCase();
    this.gender = this.gender.toLowerCase();
  }
  @Column({ nullable: false, type: 'varchar' })
  first_name: string;

  @Column({ nullable: false, type: 'varchar' })
  last_name: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  phone: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: false, type: 'varchar' })
  city: string;

  @Column({
    nullable: false,
    type: 'varchar',
    enum: [GenderEnum.MALE, GenderEnum.FEMALE],
  })
  gender: string;

  @Column({
    nullable: false,
    type: 'varchar',
    enum: [RolesEnum.USER],
    default: RolesEnum.USER,
  })
  role: string;
}
