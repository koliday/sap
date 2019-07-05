package com.koliday.sap.controller;
/**

 *@desc 用户登录、注册控制器

 *@author  koliday

 *@date  2019/7/5
 */
import com.alibaba.fastjson.JSON;
import com.koliday.sap.service.intf.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class UserController {
    private static Logger logger= LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;
    @GetMapping("/")
    public String getLoginPage(){
        return "login";
    }

    @PostMapping("/login")
    @ResponseBody
    public String login(HttpServletRequest request){
        String username=request.getParameter("username");
        String password=request.getParameter(("password"));
        logger.info(username+" "+password);
        Integer loginResult=userService.login(username,password);
        return JSON.toJSONString(loginResult);
    }
}
