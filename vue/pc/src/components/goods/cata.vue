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
                     <el-button type="primary">添加分类</el-button>
                 </el-col>
             </el-row>

             <tree-table :data="cataList" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="">
                 <template slot="isOk" slot-scope="scope">
                     <i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color:lightgreen"></i>
                     <i class="el-icon-error" v-else style="color:red"></i>
                 </template>
                 <template slot="order" slot-scope="scope">
                        <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
                        <el-tag type="success" v-else-if="scope.row.cat_level==1">二级</el-tag>
                        <el-tag type="warning" v-else-if="scope.row.cat_level==2">三级</el-tag>
                 </template>
                 <template slot="odt">
                             <el-button type="primary" icon="el-icon-edit" size="mini" >编辑</el-button>
                             <el-button type="danger" icon="el-icon-delete" size="mini" >删除</el-button>
                 </template>
             </tree-table>
        </el-card>
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
            ]
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
        }
    }
}
</script>

<style lang="less" scoped>

</style>