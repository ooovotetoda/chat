<script setup lang="ts">
import { io, type Socket } from 'socket.io-client'
import type {Message} from "~/types/message";
const chatWindow = ref(null)

const socket = ref<Socket>();
const message = ref("")
const messages = ref<Message[]>([])


const user = useState('user', () => {
  return {
    username: ""
  }
})

onMounted(async () => {
  if (!user.value.username) {
    await navigateTo("/")
  }

  socket.value = io({
    path: '/api/socket.io'
  })

  socket.value.on("message", (message: Message) => {
    messages.value.push(message)

    nextTick(() => {
      if (chatWindow.value) {
        //@ts-ignore
        const element = chatWindow.value.$el;

        element.scrollTop = element.scrollHeight;
      }
    });
  })
})

const sendMessage = () => {
  socket.value?.emit("chatMessage", {
    username: user.value.username,
    text: message.value
  })
  message.value = ""
}

onBeforeUnmount(() => {
  socket.value?.disconnect()
})
</script>

<template>
  <VContainer>
    <VList ref="chatWindow" lines="one" class="h-chat max-h-chat overflow-y-scroll p-8 mb-4">
      <VListItem
          v-for="msg in messages"
          :key="msg"
          :title="msg.username"
          prepend-avatar="https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"
      >{{ msg.text }}</VListItem>
    </VList>

    <VForm @submit.prevent="sendMessage">
      <VTextField
          label=""
          variant="outlined"
          density="comfortable"
          v-model="message"
      >
        <template v-slot:append>
          <VBtn
              class="min-h-12"
              variant="outlined"
              type="submit"
          >Send</VBtn>
        </template>
      </VTextField>

    </VForm>
  </VContainer>
</template>

<style>
.v-list-item {
  &-title {
    font-weight: bold !important;
  }
}
</style>