import { BaseSeeder } from '@adonisjs/lucid/seeders';

import User from '#models/user';

export default class Seeder extends BaseSeeder {
	async run() {
		await User.query().delete();
		await User.createMany([{ username: 'good_username', password: 'password' }]);
	}
}
