package com.koliday.sap.controller;
/**

 *@desc 用户登录、注册控制器

 *@author  koliday

 *@date  2019/7/5
 */
import com.alibaba.fastjson.JSON;
import com.koliday.sap.dto.*;
import com.koliday.sap.entity.EmployeeEntity;
import com.koliday.sap.entity.UserEntity;
import com.koliday.sap.service.intf.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
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

    @PostMapping("/logout")
    @ResponseBody
    public String logout(HttpSession session){
        session.removeAttribute("user");
        Integer result=1;
        return JSON.toJSONString(result);
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

    @RequestMapping("/annualreport")
    public String getMySpacePage(){

        return "annualreport";
    }

    @PostMapping("/getFiveYearInquiryOrderChart")
    @ResponseBody
    public String getFiveYearInquiryOrderChart(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer uid=user.getUid();
        List<FiveYearInquiryOrderDTO> fiveYearInquiryOrderChart = userService.getFiveYearInquiryOrderChart(uid);
        System.out.println(JSON.toJSONString(fiveYearInquiryOrderChart));
        return JSON.toJSONString(fiveYearInquiryOrderChart);
    }


    @GetMapping("/personalinfo")
    public String getPersonalInfoPage(HttpSession session, Model model){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer uid=user.getUid();
        PersonalInfoDTO personalInfo = userService.getPersonalInfo(uid);
        model.addAttribute("info",personalInfo);
        return "personalinfo";
    }

    @GetMapping("/financesummary")
    public String getFinanceSummaryPage(HttpSession session, Model model){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer uid=user.getUid();
        MonthlyPerformanceDTO monthlyPerformance = userService.getMonthlyPerformance(uid);
        model.addAttribute("pef",monthlyPerformance);
        return "financesummary";
    }

    @PostMapping("/getFiveYearConversionRateChart")
    @ResponseBody
    public String getFiveYearConversionRateChart(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer uid=user.getUid();
        FiveYearConversionRateDTO fiveYearConversionRateChart = userService.getFiveYearConversionRateChart(uid);
        System.out.println(JSON.toJSONString(fiveYearConversionRateChart));
        return JSON.toJSONString(fiveYearConversionRateChart);
    }
}
