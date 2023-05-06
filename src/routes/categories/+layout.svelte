<script lang="ts">
    import type { LayoutData } from "./$types";

    export let data: LayoutData;
</script>

<div>
    <nav class="flex flex-col">
        {#each data.categories as category (category.id)}
            <a href="{`/categories/${category.id}`}">
                {category.name}
            </a>
        {/each}
        <a href="/categories/add">+ Add Category</a>
    </nav>
</div>