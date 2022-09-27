import Mock from 'mockjs'
import { login } from './data/login'
Mock.mock('/api/login', 'post', login)