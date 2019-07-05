package com.koliday.sap.service.impl;

import com.koliday.sap.entity.UserEntity;
import com.koliday.sap.mapper.UserMapper;
import com.koliday.sap.service.intf.UserService;
import com.koliday.sap.utils.MD5Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private static Logger logger= LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    private UserMapper userMapper;
    @Override
    public Integer login(String username, String password) {
        //根据用户名从数据库里查出密码
        UserEntity user=userMapper.login(username);
        String correctPassword=user.getPassword();
        logger.info(correctPassword);
        //若用户名不存在，返回-1
        if(correctPassword==null)
            return -1;
        //用户名存在则检查密码是否正确，正确返回1，错误返回-2
        if(MD5Util.encodePassword(username,password).equals(correctPassword)){
            return 1;
        }else{
            return -2;
        }
    }
}
