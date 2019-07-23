package com.koliday.sap.service.intf;

import com.koliday.sap.dto.*;
import com.koliday.sap.entity.UserEntity;

import java.util.List;
import java.util.Map;

public interface UserService {
    Map<String,Object> login(String username, String password);
    Integer register(UserDTO user);

    List<FiveYearInquiryOrderDTO> getFiveYearInquiryOrderChart(Integer uid);

    PersonalInfoDTO getPersonalInfo(Integer uid);

    MonthlyPerformanceDTO getMonthlyPerformance(Integer uid);

    BestSellingProdctDTO getBestSellingProduct(Integer uid);

    FiveYearConversionRateDTO getFiveYearConversionRateChart(Integer uid);
}
