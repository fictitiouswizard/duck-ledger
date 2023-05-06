<script lang="ts">
    import "../app.css";
</script>

<div class="flex flex-row h-screen w-screen">
    <div class="flex basis-40">
        <ul>
            <li><a href="/bills">Bills</a></li>
            <li><a href="/accounts">Accounts</a></li>
            <li><a href="/categories">Categories</a></li>
        </ul>
    </div>
    <div class="flex basis-full">
        <slot></slot>
    </div>
</div>
