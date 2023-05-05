<script lang="ts">
    import type { PageData, ActionData } from "./$types";

    export let data: PageData;
    export let form: ActionData;
</script>

<form method="post">
    <h1>New Bill :(</h1>
    <div>
        <label for="name">Name:</label>
        <input type="text" name="name" value={form?.data.name ?? ""} required />
        {#if form?.errors.name?._errors}
            {#each form?.errors.name?._errors as error}
                {error}
            {/each}
        {/if}
    </div>
    <div>
        <label for="dueDate">Due Date:</label>
        <input type="number"
             name="dueDate" 
             value={form?.data.dueDate ?? ""}
             min="1" 
             max="31" 
             required />
        {#if form?.errors.dueDate?._errors}
            {#each form?.errors.dueDate?._errors as error}
                {error}
            {/each}
        {/if}
    </div>
    <div>
        <label for="amount">Amount:</label>
        <input type="number"
            name="amount"
            value={form?.data.amount ?? ""} 
            min="0.01" 
            step="0.01" 
            required  />
        {#if form?.errors.amount?._errors}
            {#each form?.errors.amount?._errors as error}
                {error}
            {/each}
        {/if}
    </div>
    <div>
        <label for="description">Description:</label>
        <textarea name="description"
            id="description"
            value={form?.data.description ?? ""} 
            cols="30" 
            rows="10" />
        {#if form?.errors.description?._errors}
            {#each form?.errors.description?._errors as error}
                {error}
            {/each}
        {/if}
    </div>
    <div>
        <label for="auto">Automatic Payment:</label>
        <input type="checkbox" name="auto">
    </div>
    <div>
        <label for="account">Account:</label>
        <select name="account" id="account">
            <option value="">None</option>
            {#each data.accounts as account (account.id)}
                <option value="{account.id}">{account.name}</option>
            {/each}
        </select>
    </div>
    <div>
        <button>Add</button>
    </div>
</form>