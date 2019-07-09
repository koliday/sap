package com.koliday.sap.controller;

import com.alibaba.fastjson.JSON;
import com.koliday.sap.dto.ClientDTO;
import com.koliday.sap.dto.UserDTO;
import com.koliday.sap.entity.*;
import com.koliday.sap.service.intf.ClientService;
import com.koliday.sap.service.intf.LocalDataService;
import com.mysql.fabric.xmlrpc.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class ClientManagementController {
    @Autowired
    private ClientService clientService;
    @Autowired
    private LocalDataService localDataService;
    @GetMapping("/clientoverview")
    public String getClientManagementPage(){
        return "client_overview";
    }
    @GetMapping("/createcontactperson")
    public String getCreateContactPersonPage(Model model){
        List<VipEntity> vipList = localDataService.getVipList();
        List<DepartmentEntity> depList = localDataService.getDepList();
        List<CallFreqEntity> callFreqList = localDataService.getCallFreqList();
        List<FuncEntity> funcList = localDataService.getFuncList();
        model.addAttribute("viplist",vipList);
        model.addAttribute("deplist",depList);
        model.addAttribute("callfreqlist",callFreqList);
        model.addAttribute("funclist",funcList);
        return "create_contact_person";
    }
    @GetMapping("/createclient")
    public String getNewClientPage(Model model){

        List<VipEntity> vipList = localDataService.getVipList();
        List<DepartmentEntity> depList = localDataService.getDepList();
        List<CallFreqEntity> callFreqList = localDataService.getCallFreqList();
        List<FuncEntity> funcList = localDataService.getFuncList();
        model.addAttribute("viplist",vipList);
        model.addAttribute("deplist",depList);
        model.addAttribute("callfreqlist",callFreqList);
        model.addAttribute("funclist",funcList);
        return "create_client";
    }
    @PostMapping("/createclient")
    @ResponseBody
    public String createClient(HttpServletRequest request, HttpSession session){

        UserDTO user=(UserDTO)session.getAttribute("user");
        //封装client
        String clname= request.getParameter("clname");
        String contact= request.getParameter("contact");
        String address= request.getParameter("address");
        Integer city= Integer.valueOf(request.getParameter("city"));
        String postcode= request.getParameter("postcode");
        Integer creator=user.getUid();
        Long createtime=System.currentTimeMillis();
        ClientEntity client=new ClientEntity();
        client.setClname(clname);
        client.setClcontact(contact);
        client.setCladdress(address);
        client.setCity(city);
        client.setPostcode(postcode);
        client.setCreator(creator);
        client.setCreatetime(createtime);
        client.setStatus(1);
        //封装cp
        String cpname= request.getParameter("cpname");
        String cpContact= request.getParameter("cp_contact");
        String cpAddress= request.getParameter("cp_address");
        Integer deptno= Integer.valueOf(request.getParameter("deptno")) ;
        Integer func= Integer.valueOf(request.getParameter("func")) ;
        Integer vip= Integer.valueOf(request.getParameter("vip")) ;
        Integer callfreq= Integer.valueOf(request.getParameter("callfreq")) ;
        ContactPersonEntity contactPerson=new ContactPersonEntity();
        contactPerson.setCpname(cpname);
        contactPerson.setCpcontact(cpContact);
        contactPerson.setCpaddress(cpAddress);
        contactPerson.setDeptno(deptno);
        contactPerson.setFunc(func);
        contactPerson.setVip(vip);
        contactPerson.setCallfreq(callfreq);
        contactPerson.setCreator(creator);
        contactPerson.setCreatetime(createtime);
        contactPerson.setStatus(1);
        //创建客户
        Integer result=clientService.addClientAndContactPerson(client,contactPerson);
        return JSON.toJSONString(result);
    }

    @PostMapping("/getAllClients")
    @ResponseBody
    public String getAllClients(HttpSession session){
        UserDTO user=(UserDTO)session.getAttribute("user");
        Integer uid=user.getUid();
        List<ClientDTO> clientDTOList=clientService.getAllClientsByUid(uid);
        return JSON.toJSONString(clientDTOList);
    }


    @PostMapping("/createcontactperson")
    @ResponseBody
    public String createContactPersonByClid(HttpSession session,HttpServletRequest request){
        UserDTO user=(UserDTO)session.getAttribute("user");
        //封装cp
        Integer clid=Integer.valueOf(request.getParameter("clid"));
        String cpname= request.getParameter("cpname");
        String cpContact= request.getParameter("cp_contact");
        String cpAddress= request.getParameter("cp_address");
        Integer deptno= Integer.valueOf(request.getParameter("deptno")) ;
        Integer func= Integer.valueOf(request.getParameter("func")) ;
        Integer vip= Integer.valueOf(request.getParameter("vip")) ;
        Integer callfreq= Integer.valueOf(request.getParameter("callfreq")) ;
        Integer creator=user.getUid();
        Long createtime=System.currentTimeMillis();
        ContactPersonEntity contactPerson=new ContactPersonEntity();
        contactPerson.setClid(clid);
        contactPerson.setCpname(cpname);
        contactPerson.setCpcontact(cpContact);
        contactPerson.setCpaddress(cpAddress);
        contactPerson.setDeptno(deptno);
        contactPerson.setFunc(func);
        contactPerson.setVip(vip);
        contactPerson.setCallfreq(callfreq);
        contactPerson.setCreator(creator);
        contactPerson.setCreatetime(createtime);
        contactPerson.setStatus(1);

        Integer result = clientService.addContactPersonToClient(contactPerson);
        return JSON.toJSONString(result);

    }

    @PostMapping("/editclient")
    @ResponseBody
    public String editClient(HttpServletRequest request){
        //封装client
        Integer clid=Integer.valueOf(request.getParameter("clid"));
        String clname= request.getParameter("clname");
        String contact= request.getParameter("contact");
        String address= request.getParameter("address");
        Integer city= Integer.valueOf(request.getParameter("city"));
        String postcode= request.getParameter("postcode");
        ClientEntity client=new ClientEntity();
        client.setClid(clid);
        client.setClname(clname);
        client.setClcontact(contact);
        client.setCladdress(address);
        client.setCity(city);
        client.setPostcode(postcode);
        Integer result=clientService.updateClient(client);
        return JSON.toJSONString(result);
    }

    @GetMapping("/editclient")
    public String getEditClientPage(){
        return "edit_client";
    }

    @PostMapping("/getclientbyclid")
    @ResponseBody
    public String getClientByClid(HttpServletRequest request){
        Integer clid=Integer.valueOf(request.getParameter("clid"));
        ClientEntity client = clientService.getClientByClid(clid);
        return JSON.toJSONString(client);
    }
    @GetMapping("/editcontactperson")
    public String getContactPersonReferencePage(){
        return "edit_contact_person";
    }
    @PostMapping("/editcontactperson")
    @ResponseBody
    public String editContactPerson(HttpServletRequest request){
        //封装cp
        Integer cpid=Integer.valueOf(request.getParameter("cpid"));
        String cpname= request.getParameter("cpname");
        String cpContact= request.getParameter("cp_contact");
        String cpAddress= request.getParameter("cp_address");
        Integer deptno= Integer.valueOf(request.getParameter("deptno")) ;
        Integer func= Integer.valueOf(request.getParameter("func")) ;
        Integer vip= Integer.valueOf(request.getParameter("vip")) ;
        Integer callfreq= Integer.valueOf(request.getParameter("callfreq")) ;
        ContactPersonEntity contactPerson=new ContactPersonEntity();
        contactPerson.setCpid(cpid);
        contactPerson.setCpname(cpname);
        contactPerson.setCpcontact(cpContact);
        contactPerson.setCpaddress(cpAddress);
        contactPerson.setDeptno(deptno);
        contactPerson.setFunc(func);
        contactPerson.setVip(vip);
        contactPerson.setCallfreq(callfreq);
        Integer result=clientService.updateContactPerson(contactPerson);
        return JSON.toJSONString(result);

    }

    @PostMapping("/getcontactperson")
    public String editContactPerson(HttpServletRequest request,Model model){

        Integer clid=Integer.valueOf(request.getParameter("clid"));
        List<ContactPersonEntity> contactPersonList = clientService.getContactPersonListByClid(clid);
        List<VipEntity> vipList = localDataService.getVipList();
        List<DepartmentEntity> depList = localDataService.getDepList();
        List<CallFreqEntity> callFreqList = localDataService.getCallFreqList();
        List<FuncEntity> funcList = localDataService.getFuncList();
        model.addAttribute("cplist",contactPersonList);
        model.addAttribute("viplist",vipList);
        model.addAttribute("deplist",depList);
        model.addAttribute("callfreqlist",callFreqList);
        model.addAttribute("funclist",funcList);
        return "edit_contact_person::cplistrefresh";
    }

    @PostMapping("/getcpoverview")
    public String getCpOverview(HttpServletRequest request,Model model){

        Integer clid=Integer.valueOf(request.getParameter("clid"));
        List<ContactPersonEntity> contactPersonList = clientService.getContactPersonListByClid(clid);
        List<VipEntity> vipList = localDataService.getVipList();
        List<DepartmentEntity> depList = localDataService.getDepList();
        List<CallFreqEntity> callFreqList = localDataService.getCallFreqList();
        List<FuncEntity> funcList = localDataService.getFuncList();
        model.addAttribute("cplist",contactPersonList);
        model.addAttribute("viplist",vipList);
        model.addAttribute("deplist",depList);
        model.addAttribute("callfreqlist",callFreqList);
        model.addAttribute("funclist",funcList);
        return "client_overview::cplistrefresh";
    }


}
