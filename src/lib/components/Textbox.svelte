<script lang="ts">
    export let label: string;
    export let name: string;
    export let value: string;
    export let required: boolean | undefined = undefined;
    export let minlength: number | undefined = undefined;
    export let maxlength: number | undefined = undefined;
    export let errors: string[] | undefined = undefined;
</script>


<label for={name}>{label}</label>
<input type="text" 
    name={name}
    value={value} 
    class="border"
    required={required} 
    {minlength}
    {maxlength} />
{#if errors}
    {#each errors as error}
        {error}
    {/each}
{/if}