// lib/api/createApplication.ts
export async function createApplication({
  type,
  phone,
  telegramNick,
  request,
  department,
}: {
  type: 'create' | 'urgent' | 'exchange'
  phone: string
  telegramNick: string
  request?: string
  department?: string
}) {
  try {
    const res = await fetch('/api/create-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
        'x-api-secret': process.env.NEXT_PUBLIC_API_SECRET!,
      },
      body: JSON.stringify({ type, phone, telegramNick, request, department }),
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
