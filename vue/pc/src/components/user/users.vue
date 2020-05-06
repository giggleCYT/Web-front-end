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
                     <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
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
                     <template slot-scope="scope" >
                         <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                             <el-button type="primary" icon="el-icon-edit" size="mini" @click="showDialogVisible(scope.row.id)"></el-button>
                         </el-tooltip>
                         <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                             <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
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

        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogVisibleClose">
            
            <el-form :model="addForm" :rules="addFormRules" ref="addRuleFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="adduser">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="修改用户信息" :visible.sync="showDV" width="50%" @close="editDialogVisibleClose">
            <el-form :model="editForm" :rules="editFormRules" ref="editRuleFormRef" label-width="70px">
                <el-form-item label="用户名" >
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="showDV = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        var checkemail=(rule, value, callback)=>{
            const regmail=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if(regmail.test(value)){
                return callback()
            }
            callback(new Error('请输入合法的邮箱'))
        }
        var checkmobile=(rule,value,callback)=>{
            const regmobile=/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
            if(regmobile.test(value)){
                return callback()
            }
            callback(new Error('请输入合法的手机号码'))
        }
        return {
            queryinfo:{
                query:'',
                pagenum:1,
                pagesize:2
            },
            uselist:[],
            total:0,
            addDialogVisible:false,
            showDV:false,
            addForm:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            addFormRules:{
                username:[
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                email:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    {validator:checkemail,trigger:'blur'}
                ],
                mobile:[
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    {validator:checkmobile,trigger:'blur'}
                ]
            },
            editForm:{},
            editFormRules:{
                email:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    {validator:checkemail,trigger:'blur'}
                ],
                mobile:[
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    {validator:checkmobile,trigger:'blur'}
                ]
            }
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
            
        },
        addDialogVisibleClose(){
            this.$refs.addRuleFormRef.resetFields()
        },
        adduser(){
            this.$refs.addRuleFormRef.validate(async value=>{
                if(!value) return
                const {data:res}=await this.$http.post('users',this.addForm)
                if(res.meta.status!==201){
                    this.$message.error('添加用户失败')
                }
                this.$message.success('添加用户成功')
                this.addDialogVisible=false
                this.getList()
            })
        },
        async showDialogVisible(id){
            const {data:res}=await this.$http.get('users/'+id)
            if(res.meta.status!==200){
                return this.$message.error('查询用户信息失败')
            }
            this.editForm=res.data
            this.showDV=true
        },
        editDialogVisibleClose(){
            this.$refs.editRuleFormRef.resetFields()
        },
        editUserInfo(){
            this.$refs.editRuleFormRef.validate(async valid=>{
                if(!valid) return
                const {data:res}=await this.$http.put('users/'+this.editForm.id,
                {
                    email:this.editForm.email,
                    mobile:this.editForm.mobile
                })
                if(res.meta.status!==200){
                    return this.$message.error('更新用户信息失败')
                }
                this.showDV=false
                this.getList()
                this.$message.success('更新用户信息成功')
            })
        },
        async removeUserById(id){
            const confirmResult=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err=>err)
            if(confirmResult!=='confirm'){
                return this.$message.info('已经取消删除')
            }
            const {data:res}=await this.$http.delete('users/'+id)
            if(res.meta.status!==200){
                return this.$message.error('用户删除失败')
            }
            this.$message.success('用户删除成功')
            this.getList()
            
        
        }
    }
}
</script>

<style lang="less" scoped>

</style>