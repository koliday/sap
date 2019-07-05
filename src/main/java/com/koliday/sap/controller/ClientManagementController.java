package com.koliday.sap.controller;

import jdk.nashorn.internal.objects.annotations.Getter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ClientManagementController {
    @GetMapping("/clientmanagement")
    public String getClientManagementPage(){
        return "client_management";
    }
    @GetMapping("/newclient")
    public String getNewClientPage(){
        return "newclient";
    }
}
