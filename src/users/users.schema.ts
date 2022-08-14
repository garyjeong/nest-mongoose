import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  // 각 로우 데이터별 시간을 저장
  timestamps: true,
};

@Schema(options)
export class Users extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    nickname: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(Users);

// Virtual Field ==> 프론트엔드나 사용자에게 보여주기위한 데이터 필드를 가상으로 잡아줌.
// 에시) 사용자 비밀번호는 노출될 필요 없으므로 실제 스키마에서는 비밀번호 필드를 사용하지만
// 반환되어질 때는 스키마의 필드 그대로 반환되기 때문에 가상 필드에서 제외해준다.
UserSchema.virtual('readOnlyData').get(function (this: Users) {
  return {
    id: this.id,
    email: this.email,
    name: this.nickname,
  };
});
