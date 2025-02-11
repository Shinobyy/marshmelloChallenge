import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import { v7 } from 'uuid';

export default class Tag extends BaseModel {
	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare uuid: string;

	@column()
	declare name: string;

	@column.dateTime({ autoCreate: true })
	declare createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare updatedAt: DateTime;

	constructor() {
		super();
		this.uuid = v7();
	}
}
