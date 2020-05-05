<template>
    <el-container class="home">
        <el-header>
            <div><img src="../assets/heima.png"><span>电商后台管理</span></div>
            <el-button type="info" @click="logout">退出</el-button></el-header>
        <el-container>
            <el-aside :width="iScollapse?'64px':'200px'">
                <div class="toggleList" @click="toggleLists" >|||</div>
                <el-menu background-color="rgb(229, 157, 169)" text-color="#fff" 
                active-text-color="blue" unique-opened :collapse="iScollapse" 
                :collapse-transition="false" router :default-active="savePath">
                    <el-submenu :index="item.path+''" v-for="item in menulist" :key="item.id">
                        <template slot="title">
                            <i :class="iconObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children"
                         :key="subItem.id" @click="save('/'+subItem.path)">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data () {
        return {
            menulist:[],
            iconObj:{
                125:'iconfont icon-users',
                103:'iconfont icon-tijikongjian',
                101:'iconfont icon-shangpin',
                102:'iconfont icon-danju',
                145:'iconfont icon-baobiao'
            },
            iScollapse:false,
            savePath:''
        }
    },
    created () {
        this.getMenuLest()
        this.savePath=window.sessionStorage.getItem('savePath')
    },
    methods: {
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login');
        },
        async getMenuLest(){
            const {data:res}=await this.$http.get('menus')
            if(res.meta.status!==200) return this.$message.error(res.meta.msg)
            this.menulist=res.data
            console.log(this.menulist);
            
        },
        toggleLists(){
            this.iScollapse=!this.iScollapse
        },
        save(path){
            window.sessionStorage.setItem('savePath',path)
        }
    }
}
</script>
<style lang="less" scoped>
.home{
    height: 100%;
}
.el-header{
    background-color: brown;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    >div{
        display: flex;
        align-items: center;
        span{
            margin-left: 15px;
        }
    }
}
.el-aside{
    background-color: rgb(229, 157, 169);
    .el-menu{
        border-right: none;
    }
}
.el-main{
    background-color: rgb(219, 221, 226);
}
.iconfont{
    padding-right: 10px;
}
.toggleList{
    color: #fff;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>