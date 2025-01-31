import { BaseSchema } from '@adonisjs/lucid/schema';

export default class Migration extends BaseSchema {
	protected tableName = 'tags';

	// eslint-disable-next-line @typescript-eslint/require-await
	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id');
			table.uuid('uuid').notNullable();
			table.string('name').notNullable();
			table.timestamp('created_at');
			table.timestamp('updated_at');
		});
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async down() {
		this.schema.dropTableIfExists(this.tableName);
	}
}
