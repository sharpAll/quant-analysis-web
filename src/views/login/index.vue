<template>
  <div class="view-account">
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <img :src="DC_TEXT_PNG" alt="" />
        </div>
        <div class="view-account-top-desc">欢迎使用示例项目！</div>
      </div>
      <div class="view-account-form">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input
              v-model:value="formInline.username"
              placeholder="请输入用户名"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <UserOutlined />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              show-password-on="click"
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockOutlined />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="captcha">
            <n-grid x-gap="12">
              <n-gi :span="12">
                <n-input
                  v-model:value="formInline.captcha"
                  placeholder="验证码"
                  @keypress.enter="handleSubmit"
                />
              </n-gi>
              <n-gi :span="12">
                <img
                  class="h-40px"
                  :src="captchaImgUrl"
                  alt="未获取到图形验证码"
                  @click="updateUUid"
                />
              </n-gi>
            </n-grid>
          </n-form-item>
          <!-- <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
              </div>
            </div>
          </n-form-item> -->
          <n-form-item>
            <n-button
              type="primary"
              size="large"
              :loading="loading"
              block
              @click="handleSubmit"
            >
              登 录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "/@/store/user";
import { useMessage } from "naive-ui";
import { UserOutlined, LockOutlined } from "@vicons/antd";
import DC_TEXT_PNG from "/@/assets/img/dc-text.png";
import { buildUUID } from "/@/utils/common";
import { loginApi } from "/@/api/sys";
interface FormState {
  username: string;
  password: string;
  captcha: string;
  uuid: string;
}

const formRef = ref();
const message = useMessage();
const loading = ref(false);
// const autoLogin = ref(true);

const formInline = reactive({
  username: "夏博",
  password: "123456",
  captcha: "",
});

const rules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
  captcha: { required: true, message: "请输入验证码", trigger: "blur" },
};

const uuid = ref(buildUUID());
const captchaImgUrl = computed(
  () => `${import.meta.env.VITE_APP_BASE_API}/captcha.jpg?uuid=${uuid.value}`
);
function updateUUid() {
  uuid.value = buildUUID();
}

const userStore = useUserStore();

const router = useRouter();
const route = useRoute();

const handleSubmit = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value.validate(async (errors: boolean) => {
    if (!errors) {
      const { username, password, captcha } = formInline;
      loading.value = true;
      const params: FormState = {
        username,
        password,
        captcha,
        uuid: uuid.value,
      };
      try {
        const { token, expire } = await loginApi(params);
        userStore.setUserName(params.username, expire);
        userStore.setToken(token, expire);
        const toPath = decodeURIComponent(
          (route.query?.redirect || "/") as string
        );
        router.replace(toPath);
      } finally {
        loading.value = false;
      }
    } else {
      message.error("请填写完整信息");
    }
  });
};
</script>

<style lang="scss" scoped>
.view-account {
  display: flex;
  align-items: center;
  height: 100vh;
  overflow: auto;
  &-container {
    padding: 32px 20px 20px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
    border-radius: 15px;
  }
  &-top {
    padding: 0 0 20px;
    text-align: center;
    &-desc {
      font-size: 16px;
      margin-top: 16px;
      color: #808695;
      text-align: left;
    }
  }
  &-other {
    width: 100%;
  }
  .default-color {
    color: #515a6e;
    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    background-image: url("/@/assets/img/login-bg.svg");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }
  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>
