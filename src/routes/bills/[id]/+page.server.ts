import type { PageServerLoad, Actions } from "./$types";
import prisma from "$lib/prisma";
import { redirect, fail } from "@sveltejs/kit";
import { ParseStatus, z } from "zod";

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

export const load = (async ({ params }) => {
    const { id } = params;

    const bill = await prisma.bill.findUnique({
        where: {id: id},
        include: {
            account: true,
        }
    });

    const accounts = await prisma.account.findMany({
        where: { deleted: false }
    })

    return { bill, accounts };
}) satisfies PageServerLoad;

export const actions = {
    remove: async ({ params: { id } }) => {
        await prisma.bill.update({
            where: { id: id },
            data: {
                deleted: true
            }
        });

        throw redirect(303, "/bills")
    },
    edit: async ({ request, params: { id }}) => {
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

        const result = await prisma.bill.update({
            where: {
                id: id
            },
            data: {
                name: name,
                dueDate: dueDate,
                amount: amount,
                description: description,
                auto: (auto ? true : false),
                account: {
                    connect: { id: accountId } 
                }
            }
        });

        throw redirect(303, `/bills/${id}`);
    }
} satisfies Actions;