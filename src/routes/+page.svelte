<script lang="ts">
	import { io } from '$lib/webosocketClientConnection';
	import { onMount } from 'svelte';
	let textfield = '';
	let username = '';
	let messages: string[] = [];

	const messageHandler = (message: string) => {
		messages = [...messages, message];
	};
	const nameHandler = (name: string) => {
		username = name;
	};
	const sendMessage = () => {
		const message = textfield.trim();
		if (!message) return;
		textfield = '';
		io.emit('message', message);
	};
	onMount(() => {
		io.on('message', messageHandler);
		io.on('name', nameHandler);
	});
	
</script>

<div class="h-screen w-screen bg-zinc-800">
    <div class="h-full w-full max-w-md mx-auto bg-zinc-500 flex flex-col">
        <header
            class="px-6 py-4 border-b border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center justify-between"
        >
            <span class="font-bold text-xl">My Chat app</span>
            <span>{username}</span>
        </header>

        <div class="h-full w-full p-4">
            {#each messages as message}
                <div class="bg-zinc-300 rounded-xl rounded-tl-none px-4 py-3 my-4 w-fit">
                    <span class="flex items-center space-between gap-4">
                        <b>{message.from}</b>
                        <i>{new Date(message.time).toLocaleString()}</i>
                    </span>
                    {message.message}
                </div>
            {/each}
        </div>

        <form
            action="#"
            on:submit|preventDefault={sendMessage}
            class="px-6 py-4 border-t border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center"
        >
            <input
                type="text"
                bind:value={textfield}
                placeholder="Type something..."
                class="bg-transparent border-none px-4 py-3 w-full"
            />
            <button type="submit" class="shrink-0 border border-white rounded-lg px-4 py-3">Send</button>
        </form>
    </div>
</div>
