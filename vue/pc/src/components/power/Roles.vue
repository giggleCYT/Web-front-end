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
                             <el-button type="primary" icon="el-icon-edit" size="mini" >编辑</el-button>
                             <el-button type="danger" icon="el-icon-delete" size="mini" >删除</el-button>
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
            roleId:''
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
            console.log(this.rightsList);
            console.log(this.defKeys);
            
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