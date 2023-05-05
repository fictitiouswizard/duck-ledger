<script lang="ts">
    import "../app.css";
</script>

<div class="flex flex-row">
    <div>
        <ul>
            <li><a href="/bills">Bills</a></li>
            <li><a href="/accounts">Accounts</a></li>
            <li><a href="/categories">Categories</a></li>
        </ul>
    </div>
    <div>
        <slot></slot>
    </div>
</div>
