import { BaseAbstractDocument, defaultSchemaOptions } from '@app/common'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { USER_TOKEN_COLLECTION } from '../constants/user.constant'
import { IUserToken } from '../interfaces/user-token.interface'

export type UserTokenDocument = HydratedDocument<IUserToken>

@Schema({
	collection: USER_TOKEN_COLLECTION,
	...defaultSchemaOptions
})
export class UserToken extends BaseAbstractDocument {
	@Prop({
		type: mongoose.Types.ObjectId,
		required: true,
		transform: (value) => value.toString()
	})
	user: string

	@Prop({
		type: String,
		trim: true,
		unique: true
	})
	public_key: string

	@Prop({
		type: String,
		trim: true,
		unique: true
	})
	private_key: string

	@Prop({
		type: String,
		trim: true,
		unique: true
	})
	refresh_token: string

	@Prop({ type: Array, required: true, trim: true, default: [] })
	used_refresh_tokens: Array<string>
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken)
