import type { BelongsTo } from '@adonisjs/lucid/types/relations';

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import { v7 } from 'uuid';

import Todo from '#models/todo';

export default class Tag extends BaseModel {
	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare uuid: string;

	@column()
	declare name: string;

	@column()
	declare todo_id: number;

	@belongsTo(() => Todo)
	declare todo: BelongsTo<typeof Todo>;

	@column.dateTime({ autoCreate: true })
	declare createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare updatedAt: DateTime;

	constructor() {
		super();
		this.uuid = v7();
	}
}
