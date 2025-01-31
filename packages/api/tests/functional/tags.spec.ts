import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

// import Status from '#models/status';
import Project from '#models/project';
import Tag from '#models/tag';
import Todo from '#models/todo';
import User from '#models/user';

test.group('Tags', (group) => {
	group.each.setup(() => testUtils.db().withGlobalTransaction());

	test('it should return the list of tags', async ({ client }) => {
		const user = await User.create({ username: 'test1234', password: 'test1234' });

		const response = await client.get(`/tags`).loginAs(user);

		response.assertStatus(200);
		response.assertBody([]);
	});

	test('it should create a new tag', async ({ client }) => {
		const baseTag = {
			name: 'Mon premier tag',
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });

		const payload = {
			name: baseTag.name,
		};

		const response = await client.post('/tags').json(payload).loginAs(user);

		response.assertStatus(201);
		response.assertBodyContains({
			name: baseTag.name,
		});
	});

	test('it should get a tag by id', async ({ client }) => {
		const baseTag = {
			name: 'Mon premier tag',
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });
		// const project = await Project.create({ name: 'mon projet', userId: user.id });
		// const status = await Status.create({ name: 'done', order: 1, projectId: project.id });
		const tag = await Tag.create({
			name: baseTag.name,
		});

		const getResponse = await client.get(`/tags/${tag.uuid}`).loginAs(user);

		getResponse.assertStatus(200);
		getResponse.assertBodyContains({
			uuid: tag.uuid,
			name: baseTag.name,
		});
	});

	test('it should update a tag', async ({ client }) => {
		const baseTag = {
			name: 'Mon premier tag',
		};
		const updatedTag = {
			name: 'Mon tag mis à jour',
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });

		const tag = await Tag.create({
			name: baseTag.name,
		});

		const putResponse = await client
			.put(`/tags/${tag.uuid}`)
			.json({
				id: tag.id,
				name: updatedTag.name,
			})
			.loginAs(user);

		putResponse.assertStatus(200);
		putResponse.assertBodyContains({
			uuid: tag.uuid,
			name: updatedTag.name,
		});
	});

	test('it should delete a tag', async ({ client }) => {
		const baseTag = {
			name: 'Mon premier tag',
		};

		const user = await User.create({ username: 'test1234', password: 'test1234' });

		const tag = await Tag.create({
			name: baseTag.name,
		});

		const deleteResponse = await client.delete(`/tags/${tag.uuid}`).loginAs(user);
		deleteResponse.assertStatus(204);
	});
});
