package com.koliday.sap.controller;

import com.alibaba.fastjson.JSON;
import com.koliday.sap.dto.*;
import com.koliday.sap.entity.InquiryEntity;
import com.koliday.sap.entity.ProductEntity;
import com.koliday.sap.entity.QuotationEntity;
import com.koliday.sap.entity.SalesOrderEntity;
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

    @GetMapping("/createquotation")
    public String getCreateQuotationPage(Model model){
        return "create_quotation";
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


    @PostMapping("/getQuotaionRefInquiry")
    @ResponseBody
    public String getQuotaionRefInquiry(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        List<InquiryDTO> allInquiryList = orderService.getQuotationRefInquiry(creator);
        return JSON.toJSONString(allInquiryList);
    }

    @PostMapping("/createQuotation")
    @ResponseBody
    public String createQuotation(HttpServletRequest request,HttpSession session){
        String inquiryItemJSON=request.getParameter("item");
        logger.info(inquiryItemJSON);

        List<QuotationItemDTO> quotationItemDTOList=JSON.parseArray(inquiryItemJSON,QuotationItemDTO.class);


        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        Integer inid=Integer.valueOf(request.getParameter("inid"));
        BigDecimal expectValue=new BigDecimal(request.getParameter("expectvalue"));
        Integer discount=Integer.valueOf(request.getParameter("discount"));
        BigDecimal netdiscount=new BigDecimal(request.getParameter("netdiscount"));
        BigDecimal itemdiscount=new BigDecimal(request.getParameter("itemdiscount"));
        SimpleDateFormat sdf=new SimpleDateFormat("MM/dd/yyyy");
        Integer quid=0;
        try {
            Date createdate=sdf.parse(request.getParameter("createdate"));
            Date validfrom=sdf.parse(request.getParameter("validfrom"));
            Date validto=sdf.parse(request.getParameter("validto"));
            Date reqdate=sdf.parse(request.getParameter("reqdate"));
            QuotationEntity quotation=new QuotationEntity();
            quotation.setInid(inid);
            quotation.setCreator(creator);
            quotation.setCreatedate(createdate);
            quotation.setExpectvalue(expectValue);
            quotation.setDiscount(discount);
            quotation.setNetdiscount(netdiscount);
            quotation.setItemdiscount(itemdiscount);
            quotation.setValidfrom(validfrom);
            quotation.setValidto(validto);
            quotation.setReqdate(reqdate);
            quotation.setIfhaveor(0);
            quid=orderService.createQuotation(quotation,quotationItemDTOList);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return JSON.toJSONString(quid);
    }

    @PostMapping("/getAllQuotation")
    @ResponseBody
    public String getAllQuotation(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        List<QuotationDTO> allQuotation = orderService.getAllQuotation(creator);
        return JSON.toJSONString(allQuotation);
    }

    @PostMapping("/getQuotation")
    @ResponseBody
    public String getQuotation(HttpServletRequest request){
        Integer quid=Integer.valueOf(request.getParameter("quid"));
        QuotationDetailDTO quotationDetailDTO=orderService.getQuotationDetail(quid);
        return JSON.toJSONString(quotationDetailDTO);
    }

    @GetMapping("/displayquotation")
    public String displayQuotation(){
        return "display_quotation";
    }

    @PostMapping("/getSalesOrderRefQuotation")
    @ResponseBody
    public String getSalesOrderRefQuotation(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        List<QuotationDTO> salesOrderRefList = orderService.getSalesOrderRefQuotation(creator);
        return JSON.toJSONString(salesOrderRefList);
    }

    @GetMapping("/createsalesorder")
    public String createSalesOrder(){
        return "create_salesorder";
    }

    @PostMapping("/createSalesOrder")
    @ResponseBody
    public String createSalesOrder(HttpServletRequest request,HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        Integer quid=Integer.valueOf(request.getParameter("quid"));
        SimpleDateFormat sdf=new SimpleDateFormat("MM/dd/yyyy");
        Integer orid=0;
        try {
            Date createdate=sdf.parse(request.getParameter("createdate"));
            Date validfrom=sdf.parse(request.getParameter("validfrom"));
            Date validto=sdf.parse(request.getParameter("validto"));
            Date reqdate=sdf.parse(request.getParameter("reqdate"));
            SalesOrderEntity salesOrderEntity=new SalesOrderEntity();
            salesOrderEntity.setQuid(quid);
            salesOrderEntity.setCreator(creator);
            salesOrderEntity.setCreatedate(createdate);
            salesOrderEntity.setValidfrom(validfrom);
            salesOrderEntity.setValidto(validto);
            salesOrderEntity.setReqdate(reqdate);
            salesOrderEntity.setIfinvoice(0);
            salesOrderEntity.setIfhavedlv(0);
            orid=orderService.createSalesOrder(salesOrderEntity);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return JSON.toJSONString(orid);
    }

    @PostMapping("/getSalesOrder")
    @ResponseBody
    public String getSalesOrder(HttpServletRequest request){
        Integer orid=Integer.valueOf(request.getParameter("orid"));
        SalesOrderDetailDTO salesOrderDetailDTO=orderService.getSalesOrderDetail(orid);
        logger.info(JSON.toJSONString(salesOrderDetailDTO));
        return JSON.toJSONString(salesOrderDetailDTO);
    }
    @GetMapping("/displaysalesorder")
    public String displaySalesOrder(){
        return "display_salesorder";
    }

    @PostMapping("/getAllSalesOrder")
    @ResponseBody
    public String getAllSalesOrder(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer creator=user.getUid();
        List<SalesOrderDTO> allSalesOrder = orderService.getAllSalesOrder(creator);
        return JSON.toJSONString(allSalesOrder);
    }
}
