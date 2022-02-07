<template>
	<div class="navbar">
		<nav>
			<h1><router-link :to="{ name: 'Home' }">Ninja Music</router-link></h1>
			<div class="links">
				<div v-if="user">
					<span class="current-user">{{ user.displayName }}</span>
					<router-link :to="{ name: 'UserPlaylists' }">My playlists</router-link>
					<router-link :to="{ name: 'CreatePlaylist' }">Create playlist</router-link>
					<button @click="handleClick">Logout</button>
				</div>
				<div v-else>
					<router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
					<router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

export default {
	setup() {
		const router = useRouter()
		const { error, logout, isPending } = useLogout()
		const { user } = getUser()


		// loggin out user
		const handleClick = async () => {
			await logout()

			if(!error.value) {
				console.log('user logged out')
				router.push({ name: 'Login' })
			}
		}

		return { handleClick, error, isPending, user }
	}
}
</script>

<style scoped>
.navbar {
	padding: 16px 10px;
	margin-bottom: 60px;
	background: #fff;
}

nav {
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

nav .links a, button {
	font-size: 14px;
	margin-left: 16px;
}
</style>
