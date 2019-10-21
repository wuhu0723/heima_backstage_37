<template>
  <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" alt="" class="avatar">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item label prop="username">
          <el-input prefix-icon="icon-user-check" v-model="loginForm.username" placeholder='请输入用户名'></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input prefix-icon="icon-key" v-model="loginForm.password" placeholder='请输入密码'></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn" @click='login'>登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/users.js'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // required:必填项  message:如果数据不符合规则所给出的提示信息  trigger：什么时候触发，失去焦点时触发  pattern:添加正则表达式
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /\w{1,}/,
            message: '请输入合法用户名，不能包含特殊符号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '请输入长度3~16位的密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    //   实现登陆
    login () {
      // 再次验证用户数据是否输入合法，如果输入合法，则发起登陆验证的请求，否则给出提示并终止本次请求
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          // 发起登陆请求
          let res = await login(this.loginForm)
          console.log(res)
        } else {
          this.$message.warning('数据输入不合法')
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
