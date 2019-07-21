package com.koliday.sap.controller;

import com.alibaba.fastjson.JSON;
import com.koliday.sap.dto.*;
import com.koliday.sap.entity.InvoiceEntity;
import com.koliday.sap.entity.QuotationEntity;
import com.koliday.sap.service.intf.InvoiceService;
import com.koliday.sap.service.intf.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
public class BillingManagementController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/createinvoice")
    public String getCreateInvoicePage(){
        return "create_invoice";
    }
    @GetMapping("/displayinvoice")
    public String getDisplayInvoicePage(){
        return "display_invoice";
    }
    @PostMapping("/getUninvoicedOrder")
    @ResponseBody
    public String getUninvoicedOrder(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        List<SalesOrderDTO> uninvoicedOrder = orderService.getUninvoicedOrder(creator);
        return JSON.toJSONString(uninvoicedOrder);
    }

    @PostMapping("/getAllInvoice")
    @ResponseBody
    public String displayInvoice(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        List<InvoiceDTO> allInvoice = invoiceService.getAllInvoice(creator);
        return JSON.toJSONString(allInvoice);
    }


    @PostMapping("/displayInvoice")
    @ResponseBody
    public String displayInvoice(HttpServletRequest request){

        Integer ivid=Integer.valueOf(request.getParameter("ivid"));
        InvoiceDetailDTO invoiceDetailDTO = invoiceService.displayInvoice(ivid);
        System.out.println(JSON.toJSONString(invoiceDetailDTO));
        return JSON.toJSONString(invoiceDetailDTO);
    }

    @PostMapping("/createInvoice")
    @ResponseBody
    public String createInvoice(HttpServletRequest request,HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        InvoiceEntity invoiceEntity=new InvoiceEntity();
        SimpleDateFormat sdf=new SimpleDateFormat("MM/dd/yyyy");
        try {
            Integer orid=Integer.valueOf(request.getParameter("orid"));
            Date createdate=sdf.parse(request.getParameter("createdate"));
            Date billingdate= sdf.parse(request.getParameter("billingdate"));
            invoiceEntity.setOrid(orid);
            invoiceEntity.setCreator(creator);
            invoiceEntity.setCreatedate(createdate);
            invoiceEntity.setBillingdate(billingdate);

        } catch (ParseException e) {
            e.printStackTrace();
        }
        Integer ivid=invoiceService.createInvoice(invoiceEntity);
        return JSON.toJSONString(ivid);
    }

    @PostMapping("/previewInvoice")
//    @ResponseBody
    public String previewInvoice(HttpServletRequest request, Model model){
        Integer ivid=Integer.valueOf(request.getParameter("ivid"));
        InvoicePreviewDetailDTO invoicePreviewDetailDTO = invoiceService.previewInvoice(ivid);
        System.out.println(JSON.toJSONString(invoicePreviewDetailDTO));
        model.addAttribute("invoice",invoicePreviewDetailDTO);
        return "invoice";
    }
}
