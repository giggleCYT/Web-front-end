<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>参数列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false">
            </el-alert>

            <el-row class="cat-opt">
                <el-col>
                    <span>选择商品分类：</span>
                    <el-cascader expand-trigger="hover" :options="cateList" :props="cascaderProps" v-model="selectedKeys" @change="handleChange">
                    </el-cascader>
                </el-col>
            </el-row>

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="动态参数" name="many">
                    <el-button type="primary" size="mini" :disabled="isDtn">添加属性</el-button>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="only">
                    <el-button type="primary" size="mini" :disabled="isDtn">添加属性</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            cateList:[],
            cascaderProps:{
                value:'cat_id',
                label:'cat_name',
                children:'children'
            },
            selectedKeys:[],
            activeName:'many',
            manyTableDate:[],
            olnyTableDate:[]
        }
    },
    created () {
        this.getCateList()
    },
    methods: {
        async getCateList(){
            const {data:res}=await this.$http.get('categories')
            if(res.meta.status!==200){
                return this.$message.error('获取商品分类失败')
            }
            this.cateList=res.data
        },
        handleChange(){
            this.getParams()
        },
        handleClick(){
            this.getParams()
        },
        async getParams(){
            if(this.selectedKeys.length!==3){
                return this.selectedKeys=[]
            } 
            const {data:res}=await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:this.activeName}})
            if(res.meta.status!==200){
                return this.$message.error('获取参数列表失败')
            }
            if(this.activeName==='many'){
                this.manyTableDate=res.data
            }else{
                this.olnyTableDate=res.data
            }
        }
    },
    computed: {
        isDtn(){
            if(this.selectedKeys.length!==3){
                return true
            }
            return false
        },
        cateId(){
            if(this.selectedKeys.length===3){
                return this.selectedKeys[2]
            }
            return null
        }
    }
    
}
</script>

<style lang="less" scoped>
.cat-opt{
    margin: 15px 0;
}
</style>