import prisma from "$lib/prisma";
import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";

const formSchema = z.object({
    name: z.string()
        .trim(),
    dueDate: z.number()
        .min(1)
        .max(31),
    amount: z.number()
        .min(0.01),
    description: z.union([z.string(), z.undefined()]),
    auto: z.boolean().default(false),
    accountId: z.union([
        z.string().cuid(),
        z.undefined()
    ]),
});

export const load = (async ({ parent }) => {
    const accounts = await prisma.account.findMany({
        where: { deleted: false },
    });

    return { accounts };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        console.log(formData);
        const parsedData = formSchema.safeParse(formData);

        if(!parsedData.success) {
            const errors = parsedData.error.format();
            console.log("%O", errors);
            return fail(422, errors);
        }

        const name = parsedData.data.name;
        const dueDate = parsedData.data.dueDate;
        const amount = parsedData.data.amount;
        const description = parsedData.data.description;
        const auto = parsedData.data.auto;
        const accountId = parsedData.data.accountId;

        console.log(`Account ID: ${accountId}`);

        if(accountId && accountId != "") {
            console.log(`Account ID in if ${accountId}`);
            const result = await prisma.bill.create({
                data: {
                    name: name,
                    dueDate: dueDate,
                    amount: amount,
                    description,
                    auto: (auto ? true : false),
                    account: {
                        connect: {id: accountId}
                    }
                }
            });
            console.log(`After insert ${result.accountId}`)
            throw redirect(303, `/bills/${result.id}`);
        }

        const result = await prisma.bill.create({
            data: {
                name: name,
                dueDate: dueDate,
                amount: amount,
                description,
                auto: (auto ? true : false)
            }
        });

        throw redirect(303, `/bills/${result.id}`);
    }
} satisfies Actions;