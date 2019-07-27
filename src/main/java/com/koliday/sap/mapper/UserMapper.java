package com.koliday.sap.mapper;

import com.koliday.sap.dto.*;
import com.koliday.sap.entity.EmployeeEntity;
import com.koliday.sap.entity.UserEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Repository
public interface UserMapper {
    UserEntity login(@Param("username")String username);

    Integer register(@Param("user")UserEntity userEntity);

    EmployeeEntity getEmployeeByEno(@Param("eno")String eno);

    UserEntity getUserByEno(@Param("eno")String eno);

    EmployeeEntity getEmployeeByEid(@Param("eid")Integer eid);

    UserEntity getUserByUid(@Param("uid")Integer uid);

    List<FiveYearInquiryDTO> getFiveYearInquiry(@Param("uid") Integer uid);

    List<FiveYearOrderDTO> getFiveYearOrder(@Param("uid") Integer uid);

    PersonalInfoDTO getPersonalInfo(@Param("uid") Integer uid);

    Integer getOrderQuantity(@Param("uid") Integer uid);

    Integer getInqQuantity(@Param("uid") Integer uid);

    BigDecimal getTotalRevenue(@Param("uid") Integer uid);

    BigDecimal getTotalCost(@Param("uid") Integer uid);

    Integer getNewClientCount(@Param("uid") Integer uid);

    List<ProductDTO> getBestSellingProduct(@Param("uid") Integer uid,@Param("cat")String category);

    List<FiveYearValueDTO> getFiveYearCatValue(@Param("table")String table,@Param("cat")String category,@Param("uid")Integer uid);

    List<CountryDistributionDTO> getFiveYearCountryDistributionChart(@Param("uid") Integer uid);

    Integer getClientCount(@Param("uid")Integer uid);

    List<FiveYearNewClientDTO> getYearlyNewClientChart(@Param("uid") Integer uid);

    List<FiveYearRevenueDTO> getFiveYearRevenue(@Param("uid")Integer uid);

    List<FiveYearCostDTO> getFiveYearCost(@Param("uid")Integer uid);
}
