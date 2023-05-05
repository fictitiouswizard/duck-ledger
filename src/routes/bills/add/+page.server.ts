import prisma from "$lib/prisma";
import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";

const formSchema = z.object({
    name: z.string({invalid_type_error: "Name must be a string"})
        .trim()
        .min(1, {message: "Name must contain at least one character"}),
    dueDate: z.coerce.number()
        .min(1, {message: "Due Date must be greater than or equal to 1"})
        .max(31, {message: "Due Date must be less than or equal to 1"}),
    amount: z.coerce.number()
        .min(0.01, {message: "Amount must be greater than or equal to 0.01"}),
    description: z.string().nullish(),
    auto: z.boolean().default(false),
    accountId: z.string().cuid().nullish(),
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
        console.log(formData.get("auto")?.toString());
        const data = {
            name: formData.get("name")?.toString(),
            dueDate: formData.get("dueDate")?.toString() == "" ? null : formData.get("dueDate")?.toString(),
            amount: formData.get("amount")?.toString() == "" ? null : formData.get("amount")?.toString(),
            description: formData.get("description")?.toString() == "" ? null : formData.get("description")?.toString(),
            auto: formData.get("auto") == undefined ? false : true,
            accountId: formData.get("account")?.toString() == "" ? null : formData.get("account")?.toString()
        }
        console.log(data.auto);
        const parsedData = formSchema.safeParse(data);

        if(!parsedData.success) {
            const errors = parsedData.error.format();
            console.log("%O", errors);
            return fail(422, { errors, data });
        }

        const name = parsedData.data.name;
        const dueDate = parsedData.data.dueDate;
        const amount = parsedData.data.amount;
        const description = parsedData.data.description;
        const auto = parsedData.data.auto;
        const accountId = parsedData.data.accountId;
        console.log(auto)

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