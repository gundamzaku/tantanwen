<template>
  <div id="main">
    <div class="admin-login">

      <el-form ref="form" :model="form">
        <el-form-item>
          <el-col :span="10">用户名称</el-col>
          <el-col :span="10">
            <el-input v-model="form.username" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="10">用户密码</el-col>
          <el-col :span="10">
            <el-input v-model="form.password" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import { Container,Input,Button,Form ,FormItem,Col} from 'element-ui';

  Vue.use(Container);
  Vue.use(Input);
  Vue.use(Button);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Col);

  export default {
    data() {
      return {
        form: {
          username:"",
          password:""
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style>

  #main{
    width: 100%;
    height: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
  }
  .el-form{
    width: 100%;
  }
  .admin-login{
    width: 40rem;
    height: 15rem;
    background: #20c997;
    display: flex;
    align-items: center;
  }

</style>
