import prisma from "$lib/prisma";
import type { LayoutServerLoad } from "./$types";

export const load = (async () => {
    const response = await prisma.category.findMany({
        where: { deleted: false },
    });

    return { categories: response };
}) satisfies LayoutServerLoad;