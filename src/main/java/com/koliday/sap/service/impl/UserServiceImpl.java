package com.koliday.sap.service.impl;

import com.koliday.sap.dto.*;
import com.koliday.sap.entity.EmployeeEntity;
import com.koliday.sap.entity.UserEntity;
import com.koliday.sap.mapper.ClientMapper;
import com.koliday.sap.mapper.UserMapper;
import com.koliday.sap.service.intf.UserService;
import com.koliday.sap.utils.MD5Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    private static Logger logger= LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    private UserMapper userMapper;
    @Override
    public Map<String,Object> login(String username, String password) {
        Map<String,Object> resultMap=new HashMap<>();
        //根据用户名从数据库里查出密码，若用户不存在，返回-1
        UserEntity user=userMapper.login(username);
        if(user == null){
            resultMap.put("result", -1);
            return resultMap;
        }
        EmployeeEntity employee = userMapper.getEmployeeByEid(user.getEid());
        String correctPassword=user.getPassword();
        //用户名存在则检查密码是否正确，正确返回1，错误返回-2
        if(MD5Util.encodePassword(username,password).equals(correctPassword)){
            resultMap.put("result", 1);
            UserDTO userDTO=new UserDTO(user,employee);
            resultMap.put("user",userDTO);
        }else{
            resultMap.put("result", -2);

        }
        return resultMap;
    }

    @Override
    public Integer register(UserDTO user) {
        //首先查询employeenum是否存在,不存在返回-1
        EmployeeEntity employee=userMapper.getEmployeeByEno(user.getEmployeeEntity().getEno());
        if(employee == null)
            return -1;
        //判断eno是否已经被注册过,注册过返回-2
        UserEntity userEnoExisted=userMapper.getUserByEno(user.getEmployeeEntity().getEno());
        if(userEnoExisted != null)
            return -2;
        //eno存在，则判断username是否重复,重复返回-3
        UserEntity userExisted=userMapper.login(user.getUsername());
        if(userExisted != null)
            return -3;
        //用户名不重复则进行注册
        UserEntity registerUserEntity=new UserEntity();
        registerUserEntity.setUsername(user.getUsername());
        String md5Password=MD5Util.encodePassword(user.getUsername(),user.getPassword());
        registerUserEntity.setPassword(md5Password);
        registerUserEntity.setEid(employee.getEid());
        registerUserEntity.setStatus(1);
        Integer registerResult=userMapper.register(registerUserEntity);
        //注册失败，返回-4
        if(registerResult != 1)
            return -4;
        //注册成功，返回1
        return 1;
    }


    @Override
    public List<FiveYearInquiryOrderDTO> getFiveYearInquiryOrderChart(Integer uid) {
        List<FiveYearInquiryDTO> fiveYearInquiry = userMapper.getFiveYearInquiry(uid);
        List<FiveYearOrderDTO> fiveYearOrder = userMapper.getFiveYearOrder(uid);
        List<FiveYearInquiryOrderDTO> fiveYearInquiryOrderDTOList=new LinkedList<>();
        for(int i=0;i<5;i++){
            FiveYearInquiryOrderDTO fiveYearInquiryOrderDTO=new FiveYearInquiryOrderDTO();
            fiveYearInquiryOrderDTO.setYear(fiveYearInquiry.get(i).getYear());
            fiveYearInquiryOrderDTO.setInquiryCount(fiveYearInquiry.get(i).getCount());
            fiveYearInquiryOrderDTO.setOrderCount(fiveYearOrder.get(i).getCount());
            ((LinkedList<FiveYearInquiryOrderDTO>) fiveYearInquiryOrderDTOList).addFirst(fiveYearInquiryOrderDTO);
        }
        return fiveYearInquiryOrderDTOList;
    }

    @Override
    public PersonalInfoDTO getPersonalInfo(Integer uid) {
        PersonalInfoDTO personalInfo = userMapper.getPersonalInfo(uid);
        Integer level=personalInfo.getLevel();
        switch (level){
            case 1:personalInfo.setLevelstr("clerk");
            case 2:personalInfo.setLevelstr("manager");
            case 3:personalInfo.setLevelstr("Administrator");
        }
        Integer leaderid=personalInfo.getLeaderid();
        if(leaderid==0)
            personalInfo.setLeadername("无直属领导");
        else
            personalInfo.setLeadername(personalInfo.getLeadername()+"("+personalInfo.getLeaderno()+")");
        return personalInfo;
    }

    @Override
    public MonthlyPerformanceDTO getMonthlyPerformance(Integer uid) {
        Integer orderQuantity=userMapper.getOrderQuantity(uid);
        Integer inqQuantity=userMapper.getInqQuantity(uid);
        BigDecimal conversion=new BigDecimal(0);
        if(inqQuantity!=0){
            conversion=new BigDecimal(String.valueOf(orderQuantity*1.0/inqQuantity));
            conversion=conversion.setScale(2,BigDecimal.ROUND_HALF_UP);
        }
        BigDecimal totalRevenue=userMapper.getTotalRevenue(uid);
        BigDecimal totalCost=userMapper.getTotalCost(uid);
        Integer newClient=userMapper.getNewClientCount(uid);

        double okr=Math.min(totalRevenue.subtract(totalCost).doubleValue()/10000,0.5)+Math.min(conversion.doubleValue()/0.6*0.3,0.3)+Math.min(newClient/10*0.2,0.2);
        BigDecimal okrdecimal=new BigDecimal(okr);
        okrdecimal=okrdecimal.setScale(2,BigDecimal.ROUND_HALF_UP);
        okr=okrdecimal.doubleValue()*100;
        Integer okrint=(int)okr;

        MonthlyPerformanceDTO monthlyPerformanceDTO=new MonthlyPerformanceDTO();
        monthlyPerformanceDTO.setOrder_quantity(orderQuantity);
        monthlyPerformanceDTO.setConversion_rate(conversion);
        monthlyPerformanceDTO.setTotal_revenue(totalRevenue);
        monthlyPerformanceDTO.setTotal_profit(totalRevenue.subtract(totalCost));
        monthlyPerformanceDTO.setNew_client_quantity(newClient);
        monthlyPerformanceDTO.setOkr(okrint);
        return monthlyPerformanceDTO;
    }

    @Override
    public BestSellingProdctDTO getBestSellingProduct(Integer uid) {
        BestSellingProdctDTO bestSellingProdctDTO=new BestSellingProdctDTO();
        bestSellingProdctDTO.setKdProduct(userMapper.getBestSellingProduct(uid,"Kitchen & Dining" ));
        bestSellingProdctDTO.setStProduct(userMapper.getBestSellingProduct(uid,"Storage" ));
        bestSellingProdctDTO.setPgProduct(userMapper.getBestSellingProduct(uid,"Patio & Garden" ));
        bestSellingProdctDTO.setBbProduct(userMapper.getBestSellingProduct(uid,"Bed & Bath" ));
        bestSellingProdctDTO.setFnProduct(userMapper.getBestSellingProduct(uid,"Furniture" ));
        return bestSellingProdctDTO;
    }

    @Override
    public FiveYearConversionRateDTO getFiveYearConversionRateChart(Integer uid) {
        List<FiveYearInquiryDTO> fiveYearInquiry = userMapper.getFiveYearInquiry(uid);
        List<FiveYearOrderDTO> fiveYearOrder = userMapper.getFiveYearOrder(uid);
        FiveYearConversionRateDTO fiveYearConversionRateDTO=new FiveYearConversionRateDTO();
        int[] year=new int[5];
        Object[][] data=new Object[5][2];
        for(int i=0;i<5;i++){
            year[i]=Integer.valueOf(fiveYearInquiry.get(i).getYear());
            data[i][0]=Integer.valueOf(fiveYearInquiry.get(i).getYear());
            double rate=fiveYearOrder.get(i).getCount()*1.0/fiveYearInquiry.get(i).getCount();
            BigDecimal ratedecimal=new BigDecimal(rate);
            rate=ratedecimal.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
            data[i][1]=rate;
        }
        fiveYearConversionRateDTO.setYear(year);
        fiveYearConversionRateDTO.setData(data);
        return fiveYearConversionRateDTO;
    }




    @Override
    public List<CountryDistributionDTO> getFiveYearCountryDistributionChart(Integer uid) {
        List<CountryDistributionDTO> fiveYearCountryDistributionChart = userMapper.getFiveYearCountryDistributionChart(uid);
        int clientCount=userMapper.getClientCount(uid);
        int firstFourCount=0;
        for(CountryDistributionDTO countryDistributionDTO:fiveYearCountryDistributionChart){
            firstFourCount+=countryDistributionDTO.getData();
        }
        CountryDistributionDTO leftClient=new CountryDistributionDTO();
        leftClient.setLabel("Other");
        leftClient.setData(clientCount-firstFourCount);
        fiveYearCountryDistributionChart.add(leftClient);
        return fiveYearCountryDistributionChart;
    }

    @Override
    public List<FiveYearNewClientDTO> getYearlyNewClientChart(Integer uid) {
        List<FiveYearNewClientDTO> yearlyNewClientChart = userMapper.getYearlyNewClientChart(uid);
        Collections.reverse(yearlyNewClientChart);
        return yearlyNewClientChart;
    }

    @Override
    public List<FiveYearRevenueProfitDTO> getYearlyRevenueProfitChart(Integer uid) {
        List<FiveYearRevenueDTO> fiveYearRevenue = userMapper.getFiveYearRevenue(uid);
        List<FiveYearCostDTO> fiveYearCost = userMapper.getFiveYearCost(uid);
        List<FiveYearRevenueProfitDTO> fiveYearRevenueProfitDTOList=new LinkedList<>();
        for(int i=0;i<5;i++){
            FiveYearRevenueProfitDTO fiveYearRevenueProfitDTO=new FiveYearRevenueProfitDTO();
            fiveYearRevenueProfitDTO.setYear(fiveYearRevenue.get(i).getYear());
            fiveYearRevenueProfitDTO.setRevenue(fiveYearRevenue.get(i).getCount());
            if(fiveYearCost.get(i).getCount()==null){
                fiveYearCost.get(i).setCount(0);
            }
            fiveYearRevenueProfitDTO.setProfit(fiveYearRevenue.get(i).getCount()-fiveYearCost.get(i).getCount());
            ((LinkedList<FiveYearRevenueProfitDTO>) fiveYearRevenueProfitDTOList).addFirst(fiveYearRevenueProfitDTO);
        }
        return fiveYearRevenueProfitDTOList;
    }
}
