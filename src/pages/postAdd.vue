<template>
  <div class="postadd">
    <!-- 面包屑--路径导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="margin-top:30px">
      <!-- 表单数据区域 -->
      <el-form ref="addForm" :model="addForm" label-width="80px">
        <el-form-item label="标题:">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="类型:">
          <el-radio-group v-model="addForm.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容:" v-if="addForm.type === 1">
          <!-- 富文本框 -->
          <VueEditor :config="config" ref='wusuowei' />
        </el-form-item>
        <el-form-item label="内容:" v-if="addForm.type === 2">
          <!-- 视频文件上传 -->
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:3000/upload"
            :headers='getToken()'
            :on-success='videoSuccess'
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="栏目:"></el-form-item>
        <el-form-item label="封面:"></el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="add">立即发布</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      addForm: {
        title: '', // 当前文章的标题
        content: '', // 如果是文章，这个属性存储文章的内容，如果是视频，这个属性存储视频上传好的服务器端路径
        categories: [], // 存储当前用户所选择的栏目id
        cover: [], // 存储当前用户所上传成功的封面图片的id
        type: 1 // 当前文章的类型
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          headers: this.getToken(),
          name: 'file',
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.getToken(),
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        }
      }
    }
  },
  methods: {
    //   当视频上传成功之后触发的钩子函数
    videoSuccess (response, file, fileList) {
    //   console.log(response)
    //   console.log(file)
    //   console.log(fileList)
      if (this.addForm.type === 2) {
        this.addForm.content = response.data.url
      }
    },
    //   获取token
    getToken () {
      return {
        Authorization: localStorage.getItem('heima_backstage_37_token')
      }
    },
    add () {
      // 收集文章数据
      if (this.addForm.type === 1) {
        // console.log(this.$refs.wusuowei.editor.root.innerHTML)
        this.addForm.content = this.$refs.wusuowei.editor.root.innerHTML
      }
      console.log(this.addForm)
    }
  }
}
</script>

<style>
</style>
