<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>


<table>
    <thead>
        <tr>
            <td>Name</td>
            <td>Amount</td>
            <td>Due Date</td>
            <td>Automatic</td>
            <td>Account</td>
        </tr>
    </thead>
    <tbody>
        {#each data.bills as bill, i (bill.id)}
            <tr class:gray={i % 2 == 0}>
                <td><a href={`/bills/${bill.id}`}>{bill.name}</a></td>
                <td>{bill.amount}</td>
                <td>{bill.dueDate}</td>
                <td>{bill.auto ? "Y" : "N"}</td>
                <td>{bill.account?.name ?? ""}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .gray {
        background-color: blanchedalmond;
    }
</style>