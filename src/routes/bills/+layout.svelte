<script lang="ts">
    import type { LayoutData } from "./$types";

    export let data: LayoutData;
</script>

<div class="flex flex-row w-full h-full">
    <nav data-sveltekit-reload class="flex basis-1/4">
        <ul>
            {#each data.bills as bill (bill.id)}
                <li><a href="/bills/{bill.id}">{bill.name}</a></li>
            {/each}
            <li><a href="/bills/add">+ Add Bill</a></li>
        </ul>
    </nav>
    <div class="flex basis-full">
        <slot></slot>
    </div>
</div>
