
export async function sendObjectTelegram(
  type: string,
  data: Record<string, any>
) {
  const dataTrans: Record<string, string> = {
    department: "Відділення",
    telegram: "Телеграм",
    phone: "Телефон",
    request: "Запит",
    create: "Запит",
    exchange: "Обмін",
  };
  const normalizedType = type.trim().toLowerCase();
  // Формуємо текстове повідомлення (таблицю в Telegram краще робити як простий текст)
  const text =
    `*Нові дані з форми < ${dataTrans[normalizedType] ?? normalizedType} > :*\n\n` +
    Object.entries(data)
      .map(([key, value]) => `*${dataTrans[key] ?? key}:* ${String(value)}`)
      .join("\n");

  // Викликаємо Telegram API
  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    }
  );

  const result = await res.json();
  return result;
}
