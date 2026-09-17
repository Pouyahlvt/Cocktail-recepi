import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  name: string;
  gmail: string;
  ingredients: string[];
  recipe: string[];
}

export async function POST(request: Request) {
  try {
    const { name, gmail, ingredients, recipe }: EmailData =
      await request.json();

    const emailHtml = `
      <h2>Cocktail name: ${name}</h2>
      <h2>From: ${gmail}</h2>
      <p><strong>Ingredients:</strong></p>
      <ul>${ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
      <p><strong>Recipe:</strong></p>
      <ol>${recipe.map((s) => `<li>${s}</li>`).join("")}</ol>
    `;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["pouyahalavat@gmail.com"],
      subject: `New cocktail: ${name}`,
      html: emailHtml,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
