<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { redirect } from '@sveltejs/kit';

	export let data: PageData;
	export let form: ActionData;

	export let edit = false;

	if (!data.bill) {
		throw redirect(303, '/bills');
	}
</script>

<div>
	<form method="post" action="?/remove">
		<button>Remove</button>
	</form>
	<button on:click={() => (edit = !edit)}>Edit</button>
	<form method="post" action="?/edit">
		<div>
			{#if edit}
				<label for="name">Name:</label>
				<input name="name" value={data.bill?.name} required />
				{#if form?.name?._errors}
					{#each form?.name._errors as error}
						{error}
					{/each}
				{/if}
			{:else}
				Name: {data.bill?.name}
			{/if}
		</div>
		<div>
			{#if edit}
				<label for="amount">Amount:</label>
				<input type="number" name="amount" step="0.01" value={data.bill?.amount} required />
				{#if form?.amount?._errors}
					{#each form?.amount?._errors as error}
						{error}
					{/each}
				{/if}
			{:else}
				Amount: {data.bill?.amount}
			{/if}
		</div>
		<div>
			{#if edit}
				<label for="dueDate">Due Date:</label>
				<input type="number" name="dueDate" value={data.bill?.dueDate} required />
				{#if form?.dueDate?._errors}
					{#each form?.dueDate?._errors as error}
						{error}
					{/each}
				{/if}
			{:else}
				Due Date: {data.bill?.dueDate}
			{/if}
		</div>
		<div>
			{#if edit}
				<label for="description">Description:</label>
				<textArea name="description">{data.bill?.description}</textArea>
				{#if form?.description?._errors}
					{#each form?.description?._errors as error}
						{error}
					{/each}
				{/if}
			{:else}
				Description: {data.bill?.description}
			{/if}
		</div>
		<div>
			<label for="auto">Automatic:</label>
			<input type="checkbox" name="auto" checked={data.bill?.auto} disabled={!edit} />
		</div>
		<div>
			{#if edit}
				<label for="account">Account:</label>
				<select name="account" id="account">
					<option value="None" selected={data.bill?.account ? false : true}>None</option>
					{#each data.accounts as account (account.id)}
						<option value={account.id} selected={account.id === data.bill?.accountId}
							>{account.name}</option
						>
					{/each}
				</select>
			{:else}
				Account: {data.bill?.account?.name ?? ""}
			{/if}
		</div>
		{#if edit}
			<div><button>Save</button></div>
		{/if}
	</form>
</div>
