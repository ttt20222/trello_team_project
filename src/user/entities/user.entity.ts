import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { MESSAGES } from 'src/constants/message.constant';
import { Member } from 'src/member/entites/member.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsPhoneNumberConstraint } from '../decorators/is-phone-number.decorator';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  /**
   * 이메일
   * @example "hongil00@gmail.com"
   */
  @IsNotEmpty({ message: MESSAGES.AUTH.COMMON.EMAIL.REQUIRED })
  @IsEmail({}, { message: MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT })
  @Column()
  email: string;

  /**
   * 비밀번호
   * @example "Hongil00!@"
   */
  @IsNotEmpty({ message: MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED })
  @IsStrongPassword(
    {},
    {
      message: MESSAGES.AUTH.COMMON.PASSWORD.INVALID_FORMAT,
    },
  )
  @Column({ select: false })
  password: string;

  /**
   * 이름
   * @example "홍길동"
   */
  @IsNotEmpty({ message: MESSAGES.AUTH.COMMON.NAME.REQUIRED })
  @IsString()
  @Column()
  name: string;

  /**
   * 닉네임
   * @example "길똥"
   */
  @IsNotEmpty({ message: MESSAGES.AUTH.COMMON.NICKNAME.REQUIRED })
  @IsString()
  @Column()
  nickname: string;

  /**
   * 전화번호
   * @example "010-0000-0000"
   */
  @IsNotEmpty({ message: MESSAGES.AUTH.COMMON.PHONE_NUMBER.REQUIRED })
  @Validate(IsPhoneNumberConstraint)
  @Column()
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Member, (member) => member.user)
  members: Member[];
}
