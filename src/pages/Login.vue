<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();


const goToChatbot = () => {
  router.push('/home');
}
const passInput = ref<boolean>(false)

</script>

<template>
  <div class="pl-login-frame">
    <div class="pl-login-form">
      <h1 class="pl-login-form-is-logo"></h1>

      <div class="pl-form-inline-wrap vertical type-2 mt-6">
        <div class="pl-form-inline">
          <span class="pl-label ">
            Login ID
          </span>
          <div class="pl-desc">
            <v-text-field
              class="pl-form type-login "
              variant="outlined"
              hide-details
              placeholder="아이디를 입력하세요"
            ></v-text-field>
          </div>
        </div>
        <div class="pl-form-inline mt-4">
          <span class="pl-label ">
            Password
          </span>
          <div class="pl-desc">
            <v-text-field
              class="pl-form type-login "
              variant="outlined"
              hide-details
              placeholder="비밀번호를 입력하세요"
              :append-inner-icon="passInput ? 'pl-icon20 pass-eye' : 'pl-icon20 pass-eye-off'"
              @click:append-inner="passInput = !passInput"
              :type="passInput ? 'text' : 'password'"

            ></v-text-field>
          </div>
        </div>
      </div>

      <div class="pl-btn-wrap">
        <v-btn class="pl-btn is-login" @click="goToChatbot">로그인</v-btn>
      </div>
      <div class="pl-login-form-require">
        <strong>권장사항</strong>
        <span>
          운영체제 : Microsoft Windows 10 이상<br/>브라우저 : Google Chrome
        </span>
      </div>
      <div class="pl-login-form-copyright">
        COPYRIGHT © HANKOOK CLOUD INC. ALL RIGHTS RESERVED.<br>
        Version 1.0
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>