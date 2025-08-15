import { addDataAndFileToRequest, Endpoint } from 'payload';

type MetaItem = { key: string; value: string };

type ApplicationPayload = {
  phone?: string;
  telegramNick?: string;
  department?: string;
  request?: string;
};

export const CreateApp: Endpoint = {
  path: '/create-application',
  method: 'post',
  handler: async (req) => {
    const apiKey = req.headers.get('x-api-key');
    const apiSecret = req.headers.get('x-api-secret');

    // ✅ Виправлено: видалено NEXT_PUBLIC_ для безпеки
    if (
      apiKey !== process.env.API_KEY ||
      apiSecret !== process.env.API_SECRET
    ) {
      return Response.json({ error: 'Unauthorized: invalid API keys' }, { status: 403 });
    }

    try {
      await addDataAndFileToRequest(req);
      if (typeof req.json !== 'function') {
        return Response.json({ error: 'JSON parsing not supported' }, { status: 400 });
      }

      const body = (await req.json()) as ApplicationPayload;
      const { phone, telegramNick, department, request } = body;

      // Валідація обов'язкових полів
      if (!phone) {
        return Response.json({ error: 'Поле "phone" є обовʼязковим' }, { status: 400 });
      }
      if (!telegramNick) {
        return Response.json({ error: 'Поле "telegramNick" є обовʼязковим' }, { status: 400 });
      }

      // ✅ Оптимізовано: не дублюємо phone та telegramNick у мета-даних
      const metaFields: MetaItem[] = [
        ...(department ? [{ key: 'department', value: department }] : []),
        ...(request ? [{ key: 'request', value: request }] : []),
      ];

      // ✅ Виправлено: передаємо тільки поля, що існують у схемі
      const newApp = await req.payload.create({
        collection: 'applications',
        data: {
          phone,
          telegramNick,
          requestCategory: '689f0902336953064bb75738',
          meta: metaFields,
        },
        overrideAccess: true,
      });

      return Response.json({ success: true, data: newApp });

    } catch (error) {
      console.error('Error creating application:', error);
      return Response.json(
        { error: 'Помилка створення заявки' },
        { status: 500 }
      );
    }
  },
};