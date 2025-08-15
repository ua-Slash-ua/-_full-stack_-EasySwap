// lib/api/createApplication.ts
export async function createApplication({
                                          phone,
                                          telegramNick,
                                          request,
                                        }: {
  phone: string
  telegramNick: string
  request: string
}) {
  try {
    const res = await fetch('/api/create-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
        'x-api-secret': process.env.NEXT_PUBLIC_API_SECRET!,
      },
      body: JSON.stringify({ phone, telegramNick, request }),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(`API error: ${res.status} - ${error}`)
    }

    return await res.json()
  } catch (err) {
    console.error('Помилка при створенні заявки:', err)
    throw err
  }
}
