package com.koliday.sap.controller;

import com.alibaba.fastjson.JSON;
import com.koliday.sap.dto.*;
import com.koliday.sap.entity.DeliveryEntity;
import com.koliday.sap.entity.WarehouseEntity;
import com.koliday.sap.service.intf.DeliveryService;
import com.koliday.sap.service.intf.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
public class ShippingManagementController {
    @Autowired
    private DeliveryService deliveryService;
    @Autowired
    private OrderService orderService;
    @RequestMapping("/createdelivery")
    public String getCreateDeliveryPage(Model model){
        List<WarehouseEntity> warehouselist = deliveryService.getWarehouse();
        model.addAttribute("warehouselist",warehouselist);
        return "create_delivery";
    }
    @PostMapping("/createDelivery")
    @ResponseBody
    public String createDelivery(HttpServletRequest request, HttpSession session){
        String deliveryitemjson=request.getParameter("itemlistjson");
        List<DeliveryItemDTO> deliveryItemDTOList=JSON.parseArray(deliveryitemjson,DeliveryItemDTO.class);

        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer orid=Integer.valueOf(request.getParameter("orid"));
        Integer creator=user.getUid();
        SimpleDateFormat sdf=new SimpleDateFormat("MM/dd/yyyy");
        DeliveryEntity deliveryEntity=new DeliveryEntity();
        try {
            Date createdate=sdf.parse(request.getParameter("createdate"));
            Date pickdate=sdf.parse(request.getParameter("pickdate"));
            Date deldate=sdf.parse(request.getParameter("deldate"));
            String destination=request.getParameter("destination");
            deliveryEntity.setOrid(orid);
            deliveryEntity.setCreator(creator);
            deliveryEntity.setCreatedate(createdate);
            deliveryEntity.setDestination(destination);
            deliveryEntity.setDeldate(deldate);
            deliveryEntity.setPickdate(pickdate);
            deliveryEntity.setPickstatus(0);
            deliveryEntity.setPoststatus(0);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Integer deid=deliveryService.createDelivery(deliveryEntity,deliveryItemDTOList);
        return JSON.toJSONString(deid);
    }

    @PostMapping("/getDeliveryRef")
    @ResponseBody
    public String getAllSalesOrder(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        List<SalesOrderDTO> allSalesOrder = orderService.getDeliveryRef(creator);
        return JSON.toJSONString(allSalesOrder);
    }



    @RequestMapping("/postdelivery")
    public String getPostDeliveryPage(){
        return "post_delivery";
    }

    @PostMapping("/getUnpostedDelivery")
    @ResponseBody
    public String getUnpostedDelivery(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        List<DeliveryDTO> unpostedDelivery = deliveryService.getUnpostedDelivery(creator);
        return JSON.toJSONString(unpostedDelivery);
    }

    @PostMapping("/postDelivery")
    @ResponseBody
    public String postDelivery(HttpServletRequest request){
        Integer deid=Integer.valueOf(request.getParameter("deid"));
        Integer result = deliveryService.postDelivery(deid);
        return JSON.toJSONString(result);
    }

    @RequestMapping("/displaydelivery")
    public String getDisplayDeliveryPage(){
        return "display_delivery";
    }

    @PostMapping("/getAllDelivery")
    @ResponseBody
    public String getAllDelivery(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        List<DeliveryDTO> allDelivery = deliveryService.getAllDelivery(creator);
        return JSON.toJSONString(allDelivery);
    }

    @PostMapping("/displayDelivery")
    @ResponseBody
    public String displayDelivery(HttpServletRequest request){
        DeliveryDetailDTO deliveryDetailDTO = deliveryService.displayDeliveryDetail(Integer.valueOf(request.getParameter("deid")));
        return JSON.toJSONString(deliveryDetailDTO);
    }
}
