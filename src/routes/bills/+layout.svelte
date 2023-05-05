<script lang="ts">
    import type { LayoutData } from "./$types";

    export let data: LayoutData;
</script>

<div class="flex flex-row">
    <nav data-sveltekit-reload>
        <ul>
            {#each data.bills as bill (bill.id)}
                <li><a href="/bills/{bill.id}">{bill.name}</a></li>
            {/each}
            <li><a href="/bills/add">+ Add Bill</a></li>
        </ul>
    </nav>
    
    
    
    
    <slot></slot>
</div>
