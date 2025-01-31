import { HttpContext } from '@adonisjs/core/http';

import Tag from '#models/tag';
import { createSchema, updateSchema } from '#validators/tag_validator';

export default class TagController {
	async index({ auth, response }: HttpContext) {
		if (auth.use('web').isLoggedOut) {
			return response.unauthorized();
		}

		const tags = await Tag.all();

		return response.json(tags.map((t) => t.serialize()));
	}

	async show({ auth, params, response }: HttpContext) {
		if (auth.use('web').isLoggedOut) {
			return response.unauthorized();
		}

		const tag = await Tag.findByOrFail({ uuid: params.uuid });

		return response.json(tag);
	}

	async create({ auth, request, response }: HttpContext) {
		if (auth.use('web').isLoggedOut) {
			return response.unauthorized();
		}

		const payload = await request.validateUsing(createSchema);

		const tag = await Tag.create(payload);

		return response.created(tag);
	}

	async update({ auth, params, request, response }: HttpContext) {
		if (auth.use('web').isLoggedOut) {
			return response.unauthorized();
		}

		const tag = await Tag.findByOrFail({ uuid: params.uuid });
		const payload = await request.validateUsing(updateSchema);

		await tag.merge(payload).save();

		return response.json(tag);
	}

	async delete({ auth, params, response }: HttpContext) {
		if (auth.use('web').isLoggedOut) {
			return response.unauthorized();
		}

		const tag = await Tag.findByOrFail({ uuid: params.uuid });

		await tag.delete();

		return response.noContent();
	}
}
