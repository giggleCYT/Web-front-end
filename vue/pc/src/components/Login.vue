<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avater_box">
                <img src="../assets/logo.png">
            </div>
                    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                        <el-form-item prop="username">
                            <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-3702mima"></el-input>
                        </el-form-item>
                        <el-form-item class="btns">
                            <el-button type="primary" @click="login">登录</el-button>
                            <el-button type="info" @click="resetLoginForm">重置</el-button>
                        </el-form-item>
                    </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loginForm:{
                uesrname:'',
                password:''
            },
            loginFormRules:{
                username: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                password:[
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:  {
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields()
        },
        login(){
            this.$refs.loginFormRef.validate(async valid=>{
                if(!valid) return;
                const {data:res} = await this.$http.post('login',this.loginForm);
                if(res.meta.status!==200) return this.$message.error('登录失败');
                this.$message.success('登录成功');
                window.sessionStorage.setItem('token',res.data.token);
                this.$router.push('/home');
                
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    height: 300px;
    width: 450px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avater_box{
    height: 130px;
    width:130px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    img{
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.login_form{
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>