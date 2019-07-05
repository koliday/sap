package com.koliday.sap.utils;

import org.springframework.util.DigestUtils;

public class MD5Util {
    public static String encodePassword(String username,String password){
        String text=username+password;
        return DigestUtils.md5DigestAsHex(text.getBytes());
    }
}
