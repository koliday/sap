package com.koliday.sap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class BillingManagementController {
    @GetMapping("/createinvoice")
    public String getCreateInvoicePage(){
        return "create_invoice";
    }
    @GetMapping("/displayinvoice")
    public String getDisplayInvoicePage(){
        return "display_invoice";
    }
    @PostMapping("/getUninvoicedOrder")
    public String getUninvoicedOrder(){

    }
}
