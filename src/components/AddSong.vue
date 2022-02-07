<template>
	<div class="add-song">
		<button v-if="!showForm" @click="showForm = true">Add song</button>
		<form @submit.prevent="handleSubmit" v-if="showForm">
			<h4>Add a new song</h4>
			<input type="text" placeholder="Song title" required v-model="title">
			<input type="text" placeholder="Artist" required v-model="artist">
			<button>Add</button>
		</form>
	</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useDocument from '@/composables/useDocument'

export default {
	props: ['playlist'],
	setup(props) {
		const { updateSong } = useDocument('playlist', props.playlist.id)

		const title = ref('')
		const artist = ref('')
		const showForm = ref(false)

		const handleSubmit = async () => {
			const newSong = {
				title: title.value,
				artist: artist.value,
				id: Math.floor(Math.random() * 10000000)
			}
			title.value = ''
			artist.value = ''

			showForm.value = false

			await updateSong({
				songs: [...props.playlist.songs, newSong]
			})
		}

		return { title, artist, showForm, handleSubmit }
	}
}
</script>

<style scoped>
.add-song {
	margin-top: 40px;
	text-align: center;
}

form {
	max-width: 100%;
	text-align: left;
}
</style>
