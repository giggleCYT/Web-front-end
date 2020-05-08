<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row>
                <el-col >
                    <el-button type="primary" @click="showAddcatDialogVisible">添加分类</el-button>
                </el-col>
            </el-row>

            <tree-table class="treetable" :data="cataList" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="">
                <template slot="isOk" slot-scope="scope">
                    <i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color:lightgreen"></i>
                    <i class="el-icon-error" v-else style="color:red"></i>
                </template>
                <template slot="order" slot-scope="scope">
                        <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
                        <el-tag type="success" v-else-if="scope.row.cat_level==1">二级</el-tag>
                        <el-tag type="warning" v-else-if="scope.row.cat_level==2">三级</el-tag>
                </template>
                <template slot="odt" slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showDialogVisible(scope.row.cat_id)" >编辑</el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.cat_id)">删除</el-button>
                 </template>
            </tree-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="querInfo.pagenum"
                            :page-sizes="[3, 5, 10, 15]" :page-size="querInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

        <el-dialog title="添加分类" :visible.sync="addcatDialogVisible" width="50%" @close="addcatDialogVisibleClose">
            
            <el-form :model="addCataForm" :rules="addCataFormRules" ref="addCataFormRef" label-width="100px">
                <el-form-item label="分类名称：" prop="cat_name">
                    <el-input v-model="addCataForm.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级名称：">
                    <el-cascader v-model="selectedKeys" :options="parentCataList" :props="cascaderProps" expandTrigger= "hover"  @change="parentCataChange" clearable change-on-select>
                    </el-cascader>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addcatDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCat">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑分类信息" :visible.sync="showDV" width="50%" @close="editDialogVisibleClose">
            <el-form :model="editForm" :rules="editFormRules" ref="editRuleFormRef" label-width="70px">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="editForm.cat_name"></el-input>
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
        return {
            cataList:[],
            querInfo:{
                type:3,
                pagenum:1,
                pagesize:5
            },
            total:0,
            columns:[
                {
                    label:'分类名称',
                    prop:'cat_name'
                },
                {
                    label:'是否有效',
                    type: 'template',
                    template: 'isOk'
                },
                {
                    label:'排序',
                    type: 'template',
                    template: 'order'
                },
                {
                    label:'操作',
                    type: 'template',
                    template: 'odt'
                }
            ],
            addcatDialogVisible:false,
            addCataForm:{
                cat_name:'',
                cat_pid:'',
                cat_level:''
            },
            addCataFormRules:{
                cat_name:[{ required: true, message: '请输入分类名称', trigger: 'blur' }]
            },
            parentCataList:[],
            cascaderProps:{
                value:'cat_id',
                label:'cat_name',
                children:'children'
            },
            selectedKeys:[],
            showDV:false,
            cat_name:'',
            editForm:{},
            editFormRules:{
                cat_name:[{ required: true, message: '请输入分类名称', trigger: 'blur' }]
            }
        }
    },
    created () {
        this.getcataList()
    },
    methods: {
        async getcataList(){
            const {data:res}=await this.$http.get('categories',{params:this.querInfo})
            if(res.meta.status!==200){
                return this.$message.error('获取商品分类失败')
            }
            this.cataList=res.data.result
            this.total=res.data.total
        },
        handleSizeChange(newSize){
            this.querInfo.pagesize=newSize
            this.getcataList()
        },
        handleCurrentChange(newPage){
            this.querInfo.pagenum=newPage
            this.getcataList()
        },
        showAddcatDialogVisible(){
            this.getParentCataList()
            this.addcatDialogVisible=true
        },
        async getParentCataList(){
            const {data:res}=await this.$http.get('categories',{params:{type:2}})
            if(res.meta.status!==200){
                return this.$message.error('获取父级分类数据列表失败')
            }
            this.parentCataList=res.data
        },
        addCat(){
            this.$refs.addCataFormRef.validate(async value=>{
                if(!value) return
                const {data:res}=await this.$http.post('categories',this.addCataForm)
                if(res.meta.status!==201){
                    this.$message.error('添加分类失败')
                }
                this.$message.success('添加分类成功')
                this.getcataList()
                this.addcatDialogVisible=false
            })
        },
        parentCataChange(){
            if(this.selectedKeys.length>0){
                this.addCataForm.cat_pid=this.selectedKeys[this.selectedKeys.length-1],
                this.addCataForm.cat_level=this.selectedKeys.length
                return
            }else{
                this.addCataForm.cat_pid=0,
                this.addCataForm.cat_level=0
            }
        },
        addcatDialogVisibleClose(){
            this.$refs.addCataFormRef.resetFields()
            this.selectedKeys=[]
            this.addCataForm.cat_pid=0,
            this.addCataForm.cat_level=0
        },
        async showDialogVisible(id){
            const {data:res}=await this.$http.get('categories/'+id)
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
                const {data:res}=await this.$http.put('categories/'+this.editForm.cat_id,
                {
                    cat_name:this.editForm.cat_name
                })
                
                if(res.meta.status!==200){
                    return this.$message.error('更新用户信息失败')
                }
                this.showDV=false
                this.getcataList()
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
            const {data:res}=await this.$http.delete('categories/'+id)
            if(res.meta.status!==200){
                return this.$message.error('用户删除失败')
            }
            this.$message.success('用户删除成功')
            this.getcataList()
            
        
        }
    }
}
</script>

<style lang="less" scoped>
.treetable{
    margin-top: 20px;
}
.el-cascader{
    width: 100%;
}

</style>