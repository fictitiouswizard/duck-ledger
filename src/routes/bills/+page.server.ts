import { redirect } from "@sveltejs/kit";

export const load = (async ({ parent }) => {
    const { bills } = await parent();

    if(bills[0]){
        throw redirect(303, `/bills/${bills[0].id}`);
    } else {
        throw redirect(303, "/bills/add");
    }
});