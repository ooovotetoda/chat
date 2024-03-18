<script setup lang="ts">
const titleText = 'Welcome to the chat!';
const title = ref('');
const markerIsHidden = ref(false)
const username = ref("")

const user = useState('user', () => {
  return {
    username: ""
  }
})

onMounted(async () => {
  if (user.value.username) {
    await navigateTo("/chat")
  }

  let index = 0;
  const printNextChar = () => {
    if (index < titleText.length) {
      title.value += titleText[index];
      index++;
      setTimeout(printNextChar, getRandomDelay(50, 200));
    } else {
      markerIsHidden.value = true
    }
  };

  printNextChar();
});

const login = async () => {
  user.value.username = username.value
  await navigateTo("/chat")
}

</script>

<template>
  <VResponsive class="mx-auto align-center">
    <VForm @submit.prevent="login" class="flex flex-column align-center gap-8 min-w-96">
    <h1 class="title text-4xl font-semibold font-pixel" :class="{marker_hidden: markerIsHidden}">{{ title }}</h1>
      <VTextField
          label="Username"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="w-full max-w-96"
          v-model="username"
      ></VTextField>

      <div class="">
        <VBtn variant="outlined" type="submit">Log in</VBtn>
      </div>
    </VForm>
  </VResponsive>
</template>

<style scoped>
@keyframes blink {
  50% {
    opacity: 0;
  }
}

.title::after {
  content: '|';
  margin-left: 4px;
  animation: blink 1s step-end infinite;
}

.marker_hidden::after {
  content: none;
}
</style>