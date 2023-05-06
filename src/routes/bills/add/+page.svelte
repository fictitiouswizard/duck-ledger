<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import Textbox from '$lib/components/Textbox.svelte';
	import Numberbox from '$lib/components/Numberbox.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="h-full w-full flex flex-row justify-center items-center">
	<div class="h-4/6 w-[400px] rounded-xl p-5 shadow-lg">
		<form method="post">
			<h1 class="text-3xl">New Bill :(</h1>
			<div>
				<Textbox
					name="name"
					label="Name:"
					value={form?.data.name ?? ''}
					errors={form?.errors.name?._errors}
					required
				/>
			</div>
			<div>
				<Numberbox
					name="dueDate"
					label="Due Date"
					value={form?.data.dueDate ?? ''}
					errors={form?.errors.dueDate?._errors}
					min={1}
					max={31}
					required
				/>
			</div>
			<div>
				<Numberbox
					name="amount"
					label="Amount:"
					value={form?.data.amount ?? ''}
					errors={form?.errors.amount?._errors}
					min={0.01}
					step={0.01}
					required
				/>
			</div>
			<div>
				<label for="description">Description:</label>
				<textarea
					name="description"
					id="description"
					value={form?.data.description ?? ''}
					class="border"
					cols="30"
					rows="10"
				/>
				{#if form?.errors.description?._errors}
					{#each form?.errors.description?._errors as error}
						{error}
					{/each}
				{/if}
			</div>
			<div>
				<label for="auto">Automatic Payment:</label>
				<input type="checkbox" name="auto" />
			</div>
			<div>
				<label for="account">Account:</label>
				<select name="account" id="account">
					<option value="">None</option>
					{#each data.accounts as account (account.id)}
						<option value={account.id}>{account.name}</option>
					{/each}
				</select>
			</div>
			<div>
				<PrimaryButton label="Add" />
			</div>
		</form>
	</div>
</div>
