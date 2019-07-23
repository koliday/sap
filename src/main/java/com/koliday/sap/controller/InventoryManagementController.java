package com.koliday.sap.controller;

import com.alibaba.fastjson.JSON;
import com.koliday.sap.dto.InventoryByProductDTO;
import com.koliday.sap.dto.PlantDTO;
import com.koliday.sap.dto.ProductDTO;
import com.koliday.sap.dto.WarehouseDTO;
import com.koliday.sap.service.intf.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class InventoryManagementController {
    @Autowired
    private InventoryService inventoryService;
    @RequestMapping("/plant")
    public String getPlantPage(){
        return "plant";
    }
    @RequestMapping("/product")
    public String getProductPage(){
        return "product";
    }

    @PostMapping("/getAllPlant")
    @ResponseBody
    public String getAllPlant(){
        List<PlantDTO> allPlant = inventoryService.getAllPlant();
        return JSON.toJSONString(allPlant);
    }

    @PostMapping("/getPlant")
    @ResponseBody
    public String getPlant(HttpServletRequest request){
        Integer plid=Integer.valueOf(request.getParameter("plid"));
        List<WarehouseDTO> plant = inventoryService.getPlant(plid);
        System.out.println(JSON.toJSONString(plant));
        return JSON.toJSONString(plant);
    }


    @PostMapping("/getQuantity")
    @ResponseBody
    public String getQuantity(HttpServletRequest request){
        Integer whid=Integer.valueOf(request.getParameter("whid"));
        Integer pid=Integer.valueOf(request.getParameter("pid"));
        System.out.println("whid:"+whid+"pid"+pid);
        Integer available=inventoryService.getQuantity(whid,pid);
        System.out.println(available);
        return JSON.toJSONString(available);
    }

    @PostMapping("/getInventoryByProduct")
    @ResponseBody
    public String getInventoryByProduct(HttpServletRequest request){
        Integer pid=Integer.valueOf(request.getParameter("pid"));
        List<InventoryByProductDTO> inventoryByProduct = inventoryService.getInventoryByProduct(pid);
        System.out.println(JSON.toJSONString(inventoryByProduct));
        return JSON.toJSONString(inventoryByProduct);
    }
}
