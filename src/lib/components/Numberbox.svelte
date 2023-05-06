<script lang="ts">
    export let name: string;
    export let label: string;
    export let value: string;
    export let min: number | undefined = undefined;
    export let max: number | undefined = undefined;
    export let required: boolean | undefined = undefined;
    export let step: number | undefined = undefined;
    export let errors: string[] | undefined = undefined;
</script>



<label for={name}>{label}</label>
<input type="number"
        name={name}
        value={value}
        class="border"
        {min}
        {max}
        {step}
        {required} />
{#if errors}
    {#each errors as error}
        {error}
    {/each}
{/if}