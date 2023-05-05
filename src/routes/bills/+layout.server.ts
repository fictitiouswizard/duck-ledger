import prisma from "$lib/prisma";
import type { LayoutServerLoad } from "./$types";

export const load = (async () => {
    const response = await prisma.bill.findMany({
        where: { deleted: false }
    });

    return { bills: response };
}) satisfies LayoutServerLoad;