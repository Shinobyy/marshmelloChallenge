import vine, { SimpleMessagesProvider } from '@vinejs/vine';

export const createSchema = vine.compile(
	vine.object({
		name: vine.string().minLength(2).maxLength(30),
	}),
);

createSchema.messagesProvider = new SimpleMessagesProvider({
	'name.minLength': 'Le nom du tag doit faire au minimum 2 caractères',
	'name.maxLength': 'Le nom du tag doit faire au maximum 30 caractères',
});

export const updateSchema = vine.compile(
	vine.object({
		name: vine.string().minLength(2).maxLength(30),
	}),
);

updateSchema.messagesProvider = new SimpleMessagesProvider({
	'name.minLength': 'Le nom du tag doit faire au minimum 2 caractères',
	'name.maxLength': 'Le nom du tag doit faire au maximum 30 caractères',
});
