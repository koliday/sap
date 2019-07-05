package com.koliday.sap.service.impl;

import com.koliday.sap.dto.UserDTO;
import com.koliday.sap.entity.EmployeeEntity;
import com.koliday.sap.entity.UserEntity;
import com.koliday.sap.mapper.UserMapper;
import com.koliday.sap.service.intf.UserService;
import com.koliday.sap.utils.MD5Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    private static Logger logger= LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    private UserMapper userMapper;
    @Override
    public Map<String,Object> login(String username, String password) {
        Map<String,Object> resultMap=new HashMap<>();
        //根据用户名从数据库里查出密码，若用户不存在，返回-1
        UserEntity user=userMapper.login(username);
        if(user == null){
            resultMap.put("result", -1);
            return resultMap;
        }
        String correctPassword=user.getPassword();
        //用户名存在则检查密码是否正确，正确返回1，错误返回-2
        if(MD5Util.encodePassword(username,password).equals(correctPassword)){
            resultMap.put("result", 1);
            resultMap.put("user",user);
        }else{
            resultMap.put("result", -2);

        }
        return resultMap;
    }

    @Override
    public Integer register(UserDTO user) {
        //首先查询employeenum是否存在,不存在返回-1
        EmployeeEntity employee=userMapper.getEmployeeByEno(user.getEmployeeEntity().getEno());
        if(employee == null)
            return -1;
        //判断eno是否已经被注册过,注册过返回-2
        UserEntity userEnoExisted=userMapper.getUserByEno(user.getEmployeeEntity().getEno());
        if(userEnoExisted != null)
            return -2;
        //eno存在，则判断username是否重复,重复返回-3
        UserEntity userExisted=userMapper.login(user.getUsername());
        if(userExisted != null)
            return -3;
        //用户名不重复则进行注册
        UserEntity registerUserEntity=new UserEntity();
        registerUserEntity.setUsername(user.getUsername());
        String md5Password=MD5Util.encodePassword(user.getUsername(),user.getPassword());
        registerUserEntity.setPassword(md5Password);
        registerUserEntity.setEid(employee.getEid());
        registerUserEntity.setStatus(1);
        Integer registerResult=userMapper.register(registerUserEntity);
        //注册失败，返回-4
        if(registerResult != 1)
            return -4;
        //注册成功，返回1
        return 1;
    }
}
