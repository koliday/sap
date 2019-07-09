package com.koliday.sap.controller;

import com.alibaba.fastjson.JSON;
import com.koliday.sap.entity.ProductEntity;
import com.koliday.sap.service.intf.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;

@Controller
public class ProductManagementController {
    @Autowired
    private ProductService productService;
    @PostMapping("/getPriceByPid")
    @ResponseBody
    public String getPriceByPid(HttpServletRequest request){
        Integer pid=Integer.valueOf(request.getParameter("pid"));
        BigDecimal price = productService.getPriceByPid(pid);
        return JSON.toJSONString(price);
    }

    @PostMapping("/getAllProduct")
    @ResponseBody
    public String getAllProduct(){
        List<ProductEntity> allProduct = productService.getAllProduct();
        return JSON.toJSONString(allProduct);
    }
}
