import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";

import { Resend } from "resend";
import { EMAIL } from "../config";
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(1, "El nombre es requerido"),
      veterinary: z.string().optional(),
      email: z.string().email("Ingresa un correo electrónico válido"),
      "motive-checkbox": z.string().optional(),
      motive: z.string().optional(),
    }),
    handler: async (input) => {
      const {
        name,
        veterinary,
        email,
        "motive-checkbox": motiveCheckbox,
        motive,
      } = input;

      const isInterestedInKit = motiveCheckbox === "on";

      let emailContent = `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
      `;

      if (veterinary) {
        emailContent += `<p><strong>Veterinaria:</strong> ${veterinary}</p>`;
      }

      if (isInterestedInKit) {
        emailContent += `<p>Interesado/a en la venta del kit</p>`;
      }

      if (motive) {
        emailContent += `<p><strong>Motivo:</strong> ${motive}</p>`;
      }

      const { error } = await resend.emails.send({
        from: EMAIL.from,
        to: [EMAIL.to],
        subject: "Interesado/a en la venta del kit",
        html: emailContent,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      return { success: true, message: "Mensaje enviado correctamente" };
    },
  }),
};
