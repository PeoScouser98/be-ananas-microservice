import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import * as mongoosePaginate from 'mongoose-paginate-v2'
import { DiscountController } from './discount.controller'
import { DiscountRepository } from './discount.repository'
import { DiscountService } from './discount.service'
import { DiscountModelSchema, DiscountSchema } from './schemas/discount.schema'
import { isNil } from 'lodash'
import { DiscountApplyingMethod } from './constants/discount.contant'
import { DatabaseModule } from '@app/database'

@Module({
	imports: [
		DatabaseModule,
		MongooseModule.forFeatureAsync([
			{
				name: DiscountModelSchema.name,
				useFactory: () => {
					const schema = DiscountSchema
					DiscountSchema.pre('save', function () {
						if (isNil(this.applied_for_products))
							this.applying_method = DiscountApplyingMethod.ALL
						else this.applying_method = DiscountApplyingMethod.SPECIFIC
					})
					schema.plugin(mongoosePaginate)
					return schema
				}
			}
		])
	],
	providers: [
		DiscountService,
		{ provide: DiscountRepository.provide, useClass: DiscountRepository }
	],
	controllers: [DiscountController]
})
export class DiscountModule {}
