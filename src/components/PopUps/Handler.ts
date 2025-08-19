import type { NextApiRequest, NextApiResponse } from 'next';
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const payload = await getPayload({ config: payloadConfig });
  const contacts = await payload.findGlobal({ slug: 'contacts' });

  res.status(200).json(contacts);
}