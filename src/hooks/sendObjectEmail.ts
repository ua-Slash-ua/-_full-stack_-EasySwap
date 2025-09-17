import nodemailer from 'nodemailer';

export async function sendObjectEmail(type:string, data: Record<string, any>) {
  const dataTrans: Record<string, string> = {
    department:'Відділення',
    telegram:'Телеграм',
    phone:'Телефон',
    request:'Запит',
    create:'Запит',
    exchange:'Обмін',
  }
  // Створюємо HTML-таблицю з об'єкта
  const htmlTable = `
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; font-family: Arial; font-size: 14px;">
      <thead>
        <tr>
          <th align="left">Key</th>
          <th align="left">Value</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr><td>${dataTrans[key]?? key}</td><td>${String(value)}</td></tr>`
    )
    .join('')}
      </tbody>
    </table>
  `;
  // Створюємо транспортер
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  // Надсилаємо лист
  const info = await transporter.sendMail({
    from: `"Payload CMS" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER_TO,
    subject: `Нові дані з форми ${dataTrans[type]?? type}`,
    html: htmlTable,
  });
  return info;
}