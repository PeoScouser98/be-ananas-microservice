import { Injectable } from '@nestjs/common'
import { InjectConnection, InjectModel } from '@nestjs/mongoose'
import { Connection, Model } from 'mongoose'
import { UserDTO } from '../dto/user.dto'
import { IUserRepository } from '../interfaces/user.repository.interface'
import { User, UserDocument } from '../schemas/user.schema'
import { BaseAbstractRepository } from '@app/common'

@Injectable()
export class UserRepository
	extends BaseAbstractRepository<UserDocument>
	implements IUserRepository
{
	static provide: string = 'USER_REPOSITORY' as const

	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		@InjectConnection() connection: Connection
	) {
		super(userModel, connection)
	}

	async findUserByEmail(email: string): Promise<UserDocument> {
		return await this.userModel.findOne({ email: email })
	}

	async createUser(payload: UserDTO): Promise<UserDocument> {
		return await new this.userModel(payload).save()
	}
}
