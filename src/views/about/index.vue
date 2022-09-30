<script setup lang="ts"></script>

<template>
  <div class="main">
    <p>欢迎前往我的git账号给个start</p>
    <ul>
      <li>
        <div class="label">Github：</div>
        <div class="cnt">
          <a href="https://github.com/chend1/vue3-ts-admin">https://github.com/chend1/vue3-ts-admin</a>
        </div>
      </li>
      <li>
        <div class="label">Gitee：</div>
        <div class="cnt">
          <a href="https://gitee.com/chend97/vue3-vite-ts-base">https://gitee.com/chend97/vue3-vite-ts-base</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
  .main{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    &>p{
      width: 100%;
      line-height: 40px;
      font-size: 22px;
      font-weight: 700;
    }
    ul{
      width: 100%;
      margin-top: 20px;
      li{
        width: 100%;
        line-height: 35px;
        margin-bottom: 5px;
        font-size: 16px;
        display: flex;
        .label{
          width: 100px;
        }
        .cnt{
          flex: 1;
          overflow: hidden;
          a{
            display: block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            font-size: 16px;
            color: #333;
            &:hover{
              color: #2d71d8;
            }
          }
        }
      }
    }
  }
</style>
