package com.koliday.sap.controller;

import com.alibaba.fastjson.JSON;
import com.koliday.sap.dto.InquiryDTO;
import com.koliday.sap.dto.InquiryDetailDTO;
import com.koliday.sap.dto.InquiryItemDTO;
import com.koliday.sap.dto.UserDTO;
import com.koliday.sap.entity.InquiryEntity;
import com.koliday.sap.entity.ProductEntity;
import com.koliday.sap.service.intf.OrderService;
import com.koliday.sap.service.intf.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
public class OrderManagementController {
    private static Logger logger= LoggerFactory.getLogger(OrderManagementController.class);

    @Autowired
    private OrderService orderService;
    @Autowired
    private ProductService productService;

    @GetMapping("/createinquiry")
    public String getCreateInquiryPage(Model model){
        List<ProductEntity> allProduct = productService.getAllProduct();
        model.addAttribute("product",allProduct);
        return "create_inquiry";
    }


    @PostMapping("/createInquiry")
    @ResponseBody
    public String createInquiry(HttpServletRequest request, HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        //获取itemlist
        String inquiryItemJSON=request.getParameter("item");
        logger.info(inquiryItemJSON);
        List<InquiryItemDTO> inquiryItemDTOList=JSON.parseArray(inquiryItemJSON,InquiryItemDTO.class);
        for(InquiryItemDTO inquiryItemDTO:inquiryItemDTOList){
            logger.info(inquiryItemDTO.toString());
        }
        //获取inquiry信息
        Integer clid=Integer.valueOf(request.getParameter("clid"));
        BigDecimal net_value=new BigDecimal(request.getParameter("sum_net_value"));
        BigDecimal expected_value=new BigDecimal(request.getParameter("sum_expected_value"));
        SimpleDateFormat sdf=new SimpleDateFormat("MM/dd/yyyy");
        Integer inid=0;
        try {
            Date createdate=sdf.parse(request.getParameter("createdate"));
            Date validfrom=sdf.parse(request.getParameter("validfrom"));
            Date validto=sdf.parse(request.getParameter("validto"));
            InquiryEntity inquiry=new InquiryEntity();
            inquiry.setClient(clid);
            inquiry.setCreator(creator);
            inquiry.setNetvalue(net_value);
            inquiry.setExpectprofit(expected_value);
            inquiry.setCreatedate(createdate);
            inquiry.setValidfrom(validfrom);
            inquiry.setValidto(validto);
            inquiry.setIfhavequo(0);
            inid=orderService.createInquiry(inquiry,inquiryItemDTOList);
        } catch (ParseException e) {
            e.printStackTrace();
        }
            return JSON.toJSONString(inid);

    }

    @GetMapping("/displayinquiry")
    public String displayInquiry(){
        return "display_inquiry";
    }


    @PostMapping("/getAllInquiry")
    @ResponseBody
    public String getAllInquiry(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        List<InquiryDTO> allInquiryList = orderService.getAllInquiry(creator);
        return JSON.toJSONString(allInquiryList);
    }

    @PostMapping("/getInquiry")
    @ResponseBody
    public String getInquiry(HttpServletRequest request){
        Integer inid=Integer.valueOf(request.getParameter("inid"));
        InquiryDetailDTO inquiryDetail = orderService.getInquiryDetail(inid);
        return JSON.toJSONString(inquiryDetail);
    }
}
