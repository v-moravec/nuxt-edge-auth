<template>
  <div>
    <button v-if="!auth.session.value" @click="signIn('sendgrid', { email: 'voj.moravec@seznam.cz' })">Sign in</button>
    <button v-else @click="signOut()">Sign out</button>
    <div>
      {{ auth }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {signIn, signOut} from '~/lib/auth'
import {useAuth} from '~/composables/useAuth'

const auth = useAuth()
</script>

<style scoped>

</style>
