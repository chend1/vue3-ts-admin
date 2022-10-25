<script setup lang="ts">
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import { onMounted, ref } from 'vue'
const richValue = ref('')
onMounted(() => {
  tinymce.init({})
})
const emit = defineEmits(['saveClick'])
function saveClick(){
  emit('saveClick', richValue.value)
}
</script>

<template>
  <editor
    v-model="richValue"
    :init="{
      base_url: '/tinymce',
      height: 700,
      menubar: false,
      language_url: '/tinymce/zh-Hans.js',
      language: 'zh-Hans',
      plugins: 'link lists image  lineheight code table wordcount table save',
      toolbar:
      'bold italic underline strikethrough | lineheight | fontsize fontfamily | forecolor backcolor | table tabledelete | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat | save',
      font_size_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px 50px 56px 60px 64px',
      font_family_formats: '微软雅黑=微软雅黑; 宋体=宋体; 黑体=黑体; 仿宋=仿宋; 楷体=楷体; 隶书=隶书; 幼圆=幼圆; Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings',
      branding: false,
      save_onsavecallback: saveClick
    }"
  />
</template>

<style lang="less" scoped></style>
