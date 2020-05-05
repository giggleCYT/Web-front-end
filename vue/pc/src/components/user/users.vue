<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
             
             <el-row :gutter="20">
                 <el-col :span="10">
                     <el-input placeholder="请输入内容" v-model="queryinfo.query" clearable @clear="getList">
                         <el-button slot="append" icon="el-icon-search" @click="getList" ></el-button>
                     </el-input>
                 </el-col>
                 <el-col :span="6">
                     <el-button type="primary">添加用户</el-button>
                 </el-col>
             </el-row>

             <el-table  :data="uselist" stripe border>
                 <el-table-column type="index"></el-table-column>
                 <el-table-column label="姓名" prop="username"></el-table-column>
                 <el-table-column label="邮箱" prop="email"></el-table-column>
                 <el-table-column label="电话" prop="mobile"></el-table-column>
                 <el-table-column label="角色" prop="role_name"></el-table-column>
                 <el-table-column label="状态" prop="mg_state">
                     <template slot-scope="scope" >
                         <el-switch v-model="scope.row.mg_state" @change="userState(scope.row)">
                         </el-switch>
                     </template>
                 </el-table-column>
                 <el-table-column label="操作" width="180px">
                     <template >
                         <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                             <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                         </el-tooltip>
                         <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                             <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                         </el-tooltip>
                         <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                             <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                         </el-tooltip>
                     </template>
                 </el-table-column>
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="queryinfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryinfo.pagesize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            queryinfo:{
                query:'',
                pagenum:1,
                pagesize:2
            },
            uselist:[],
            total:0
        }
    },
    created () {
        this.getList()
    },
    methods: {
        async getList(){
            const {data:res}= await this.$http.get('users',{params:this.queryinfo})
            if(res.meta.status!==200){
                return this.$message.error("获取管理员列表失败")
            }
            this.uselist=res.data.users
            this.total=res.data.total
            console.log(res);
            
        },
        handleSizeChange(newSize){
            this.queryinfo.pagesize=newSize
            this.getList()
        },
        handleCurrentChange(newCurrent){
            this.queryinfo.pagenum=newCurrent
            this.getList()
            
        },
        async userState(userinfo){
            const {data:res}=await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
            if(res.meta.status!==200){
                userinfo.mg_state=!userinfo.mg_state
                return this.$message.error('更新用户状态失败')
            }
            this.$message.success('更新用户状态成功')
            
        }
    }
}
</script>

<style lang="less" scoped>

</style>