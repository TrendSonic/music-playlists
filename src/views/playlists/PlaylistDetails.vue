<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl">
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
			<button @click="handleDelete">Delete Playlist</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <p>song list here</p>
    </div>
    
  </div>
</template>

<script>
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from '@vue/runtime-core'
import useDocument from '@/composables/useDocument'
import { useRouter } from 'vue-router'
import useStorage from '@/composables/useStorage'

export default {
  props: ['id'],
  setup(props) {
		// destructing function
    const { error, document: playlist } = getDocument('playlist', props.id)
		const { deleteDoc } = useDocument('playlist', props.id)
		const { user } = getUser()
		const { deleteImage } = useStorage()
		const router = useRouter()

		// not possible to access this way- only from computed
		// console.log(playlist.value.userId)

		// checking does user exist, and comparing current user id with user that created playlist, then returning boolean
		const ownership = computed(() => {
			return playlist.value && user.value && user.value.uid == playlist.value.userId
		})

		// handling delete event -- deleting playlist
		const handleDelete = async () => {
			await deleteDoc()
			router.push({ name: 'Home'})
			await deleteImage(playlist.value.filePath)
		}
		
    return { error, playlist, ownership, handleDelete }
  }
}
</script>

<style scoped>
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }

	.cover {
    overflow: hidden;
    border-radius: 20px;
    width: 400px;
		height: 400px;
  }

	.cover img {
		background-position: center;
    width: 100%;
    height: 100%;
  }

	.playlist-info {
    text-align: center;
  }

  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }

  .playlist-info p {
    margin-bottom: 20px;
  }

  .username {
    color: #999;
  }

  .description {
    text-align: left;
  }
</style>
