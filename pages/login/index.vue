<template>
  <div class="box">
    <el-container>
      <el-aside>
        <p><span>达梦数据库实训平台</span><span>{{ TextAsset.status === '1' ?
          TextAsset.switchTitleText.Teacher : TextAsset.switchTitleText.Student }}</span></p>
      </el-aside>
      <el-main>
        <el-container>
          <el-container>
            <el-aside width="110px"></el-aside>
            <el-main>达梦数据库</el-main>
          </el-container>
          <el-footer>多元教育资源，数据库实训教育平台</el-footer>
        </el-container>
        <el-form label-width="auto" :model="formLabelAlign" ref="ruleFormRef" status-icon :rules="rules">
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="formLabelAlign.username"
             
              clearable size="large" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" v-model="formLabelAlign.password" type="password" placeholder="请输入密码"
              clearable show-password size="large" />
          </el-form-item>
          <el-form-item prop="code">
            <el-input :prefix-icon="Iphone" v-model="formLabelAlign.code" placeholder="请输入验证码" size="large"
              style="width: 160px;" />
          </el-form-item>
          <div class="switch">
            <el-icon style="transform:translate(-2px,2px);">
              <Switch />
            </el-icon>
            <span class="text" v-if="TextAsset.status === '1'" v-for="item, index in TextAsset.switchText.Student"
              @click="handleSwitch">
              <span class="letter" :class="'letter' + (index + 1)">
                {{ item }}
              </span>
            </span>
            <span class="text" v-else v-for="item, index in TextAsset.switchText.Teacher" @click="handleSwitch">
              <span class="letter" :class="'letter' + (index + 1)">
                {{ item }}
              </span>
            </span>
          </div>
          <el-form-item>
            <el-button @click="handelSubmit(ruleFormRef)" type="primary">登录</el-button>
            <el-button @click="handelReset(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// ts类型限制
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock, Iphone, Switch } from '@element-plus/icons-vue'

// 教师端学生端切换需要的数据
const TextAsset = reactive({
  status: '1',
  switchTitleText: {
    Student: "教师端",
    Teacher: "学生端"
  },
  switchText: {
    Student: "点击此处切换为教师端",
    Teacher: "点击此处切换为学生端"
  },
  switchInputText: {
    Student: "学号",
    Teacher: "工号"
  }
})

// 定义表单数据绑定数据类型
interface RuleForm {
  username: string
  password: string
  code: string
}

// 表单双向绑定数据
const formLabelAlign = reactive<RuleForm>({
  username: '',
  password: '',
  code: ''
})
const ruleFormRef = ref<FormInstance>()

// 验证表单
const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: `请输入${TextAsset.status === '1' ? TextAsset.switchInputText.Student : TextAsset.switchInputText.Teacher}`, trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }, { min: 4, max: 4, message: '请输入正确的验证码', trigger: 'blur' }],
})


onMounted(() => {
  const CookiesSwitch = useCookie('switch')
  if (CookiesSwitch.value !== undefined && CookiesSwitch.value !== null) {
    TextAsset.status = CookiesSwitch.value
  }
})

// 教师端和学生端切换
const handleSwitch = () => {
  if (TextAsset.status === '1') {
    TextAsset.status = '0'
  } else {
    TextAsset.status = '1'
  }
}

/**
 * 提交表单数据
 * @param formEl 表单实例
 */
const handelSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 数据请求
      useFetch('/api/login').then(async res => {
        if (res.data.value.username) {
          // 请求通过设置用户信息和当前登录页面
          const CookiesAccount = useCookie('account')
          const CookiesSwitch = useCookie('switch')
          CookiesSwitch.value = TextAsset.status
          CookiesAccount.value = 'admin'
          navigateTo('/')
        }
      }).catch((error) => {
        getNotification('登录失败', `${error},请联系管理员`, 'error')
      })
    } else {
      getNotification('登录失败', '请检查学号、密码、验证码是否正确', 'error')
    }
  })
}

/**
 * 重置表单数据
 * @param formEl 表单实例
 */
const handelReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
} 
</script>

<style scoped lang="scss">
.box {
  >.el-container {
    >.el-aside {
      width: 70vw;
      height: 100vh;
      background: url('/系统图片资源文件夹/登录背景图片.jpg') center no-repeat;
      background-size: cover;
      text-align: center;
      font-size: 30px;
      color: white;

      >p {
        transform: translate(-20px, 20px);
        font-weight: bolder;
        letter-spacing: 0.3rem;

        >span {
          &:nth-last-child(1) {
            display: inline-block;
            transform: translateX(20px)
          }
        }
      }
    }

    >.el-main {
      padding: 150px 70px 0px;

      >.el-container {
        >.el-container {
          height: 40px;

          >.el-aside {
            background: url('/系统图片资源文件夹/达梦数据库logo.png') no-repeat center right;
            background-size: contain;
          }

          >.el-main {
            padding: 0px;
            line-height: 40px;
            font-size: 24px;
            transform: translateX(10px);
            white-space: nowrap;
            overflow: hidden;
            font-weight: bolder
          }
        }

        >.el-footer {
          text-align: center;
          line-height: 50px;
          color: gray;
          font-size: 14px;
        }
      }

      >.el-form {
        transform: translateY(50px);

        >.switch {
          height: 20px;
          text-align: end;
          font-size: 14px;
          color: gray;

          >.text {
            font-weight: bolder;
            cursor: pointer;

            >.letter {
              animation: letter 1.5s infinite alternate;
            }

            >.letter1 {
              animation-delay: 0s;
            }

            @for $i from 2 through 10 {
              >.letter#{$i} {
                animation-delay: -#{1 - calc($i/10) + 0.1}s;
              }
            }
          }
        }

        >.el-form-item {
          &:nth-last-child(1) {
            transform: translateY(20px);

            .el-button {
              flex: 1;
            }
          }
        }
      }
    }
  }
}

@keyframes letter {
  0% {
    font-size: 14px;
  }

  50% {
    font-size: 16px;
  }

  100% {
    font-size: 18px;
  }
}
</style>