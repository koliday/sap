package com.koliday.sap.controller;
/**

 *@desc 用户登录、注册控制器

 *@author  koliday

 *@date  2019/7/5
 */
import com.alibaba.fastjson.JSON;
import com.koliday.sap.dto.UserDTO;
import com.koliday.sap.entity.EmployeeEntity;
import com.koliday.sap.entity.UserEntity;
import com.koliday.sap.service.intf.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

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
    public String login(HttpServletRequest request, HttpSession session){
        String username=request.getParameter("username");
        String password=request.getParameter("password");
        Map<String,Object> loginResultMap=userService.login(username,password);
        Integer loginResult=(Integer)loginResultMap.get("result");
        if(loginResult==1){
           session.setAttribute("user", loginResultMap.get("user"));
        }
        return JSON.toJSONString(loginResult);
    }

    @PostMapping("/register")
    @ResponseBody
    public String register(HttpServletRequest request){
        String username=request.getParameter("username");
        String password=request.getParameter("password");
        String eno=request.getParameter("eno");
        UserDTO user=new UserDTO();
        EmployeeEntity employeeEntity=new EmployeeEntity();
        employeeEntity.setEno(eno);
        user.setUsername(username);
        user.setPassword(password);
        user.setEmployeeEntity(employeeEntity);
        Integer registerResult=userService.register(user);
        return JSON.toJSONString(registerResult);
    }
}
