<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row>
                 <el-col >
                     <el-button type="primary" @click="addDialogVisible=true">添加角色</el-button>
                 </el-col>
             </el-row>

             <el-table :data="rolesList" stripe border>
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id" :class="['bdbottom',i1===0?'bdtop':'','vcenter']">
                            <el-col :span=5>
                                <el-tag closable @close="removeUserById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span=19>
                                <el-row v-for="(item2,i2) in item1.children" :key="item2.id" :class="[i2===0?'':'bdtop','vcenter']">
                                    <el-col :span=6>
                                        <el-tag type="success" closable @close="removeUserById(scope.row,item2.id)">{{item2 .authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span=18>
                                        <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="removeUserById(scope.row,item3.id)">
                                            {{item3.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>

                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>

                 <el-table-column label="操作" width="300px">
                     <template slot-scope="scope">
                             <el-button type="primary" icon="el-icon-edit" size="mini" @click="showDialogVisible(scope.row.id)" >编辑</el-button>
                             <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserId(scope.row.id)">删除</el-button>
                             <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                     </template>
                 </el-table-column>
        </el-table>
        </el-card>

        <el-dialog title="提示" :visible.sync="setRightDialogVisible" width="50%"  @close="showSetRightDialogClose">
            <el-tree :data="rightsList" :props="treeProps" ref="treeRef" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotRights">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑角色信息" :visible.sync="showDV" width="50%" @close="editDialogVisibleClose">
            <el-form :model="editForm" :rules="editFormRules" ref="editRuleFormRef" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="editForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="editForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="showDV = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="添加新角色" :visible.sync="addDialogVisible" width="50%" @close="addDialogVisibleClose">
            
            <el-form :model="addForm" :rules="addFormRules" ref="addRuleFormRef" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="adduser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            rolesList:[],
            rightsList:[],
            setRightDialogVisible:false,
            treeProps:{
                children: 'children',
                label: 'authName'
            },
            defKeys:[],
            roleId:'',
            showDV:false,
            editForm:{},
            editFormRules:{
                roleName:[{ required: true, message: '请输入角色名称', trigger: 'blur' }],
                roleDesc:[{ required: true, message: '请输入角色描述', trigger: 'blur' }]
            },
            addDialogVisible:false,
            addForm:{
                roleName:'',
                roleDesc:''
            },
            addFormRules:{
                roleName:[{ required: true, message: '请输入角色名称', trigger: 'blur' }],
                roleDesc:[{ required: true, message: '请输入角色描述', trigger: 'blur' }]
            }
        }
    },
    created () {
        this.getRolesList()
    },
    methods: {
        async getRolesList(){
            const {data:res}=await this.$http.get('roles')
            if(res.meta.status!==200){
                return this.$message.error('获取角色列表失败')
            }
            this.rolesList=res.data            
        },
        async removeUserById(role,rightid){
            const confirmResult=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err=>err)
            if(confirmResult!=='confirm'){
                return this.$message.info('已经取消删除')
            }
            const {data:res}=await this.$http.delete(`roles/${role.id}/rights/${rightid}`)
            if(res.meta.status!==200){
                return this.$message.error('用户删除失败')
            }
            this.$message.success('用户删除成功')
            // this.getList()
            role.children=res.data
        
        },
        async showSetRightDialog(role){
            this.roleId=role.id
            const {data:res}=await this.$http.get('rights/tree')
            if(res.meta.status!==200){
                return this.$message.error('获取权限数据失败')
            }
            this.rightsList=res.data
            
            this.getLeafKeys(role,this.defKeys)
            this.setRightDialogVisible=true
        },
        getLeafKeys(node,arr){
            if(!node.children){
                return arr.push(node.id)
            }
            node.children.forEach(item=>this.getLeafKeys(item,arr))
        },
        showSetRightDialogClose(){
            this.defKeys=[]
        },
        async allotRights(){
            const keys=[
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedKeys()
            ]
            const idStr=keys.join(',')
            const {data:res} = await this.$http.post(`roles/${this.roleId}/rights`,{rids:idStr})
            if(res.meta.status!==200){
                return this.$message.error('分配权限失败')
            }
            this.$message.success('分配权限成功')
            this.getRolesList()
            this.setRightDialogVisible=false
        },
        async showDialogVisible(id){
            const {data:res}=await this.$http.get('roles/'+id)
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
                const {data:res}=await this.$http.put('roles/'+this.editForm.roleId,
                {
                    roleName:this.editForm.roleName,
                    roleDesc:this.editForm.roleDesc
                })
                
                if(res.meta.status!==200){
                    return this.$message.error('更新用户信息失败')
                }
                this.showDV=false
                this.getRolesList()
                this.$message.success('更新用户信息成功')
            })
        },
        async removeUserId(id){
            const confirmResult=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err=>err)
            if(confirmResult!=='confirm'){
                return this.$message.info('已经取消删除')
            }
            const {data:res}=await this.$http.delete('roles/'+id)
            if(res.meta.status!==200){
                return this.$message.error('用户删除失败')
            }
            this.$message.success('用户删除成功')
            this.getRolesList()
            
        
        },
        addDialogVisibleClose(){
            this.$refs.addRuleFormRef.resetFields()
        },
        adduser(){
            this.$refs.addRuleFormRef.validate(async value=>{
                if(!value) return
                const {data:res}=await this.$http.post('roles',this.addForm)
                if(res.meta.status!==201){
                    this.$message.error('添加用户失败')
                }
                this.$message.success('添加用户成功')
                this.addDialogVisible=false
                this.getRolesList()
            })
        }
    }
}

</script>

<style lang="less" scoped>
.el-tag{
    margin: 7px;
}
.bdtop{
    border-top: 1px solid #eee;
}
.bdbottom{
    border-bottom: 1px solid #eee;
}
.vcenter{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>