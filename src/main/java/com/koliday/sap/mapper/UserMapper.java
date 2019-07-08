package com.koliday.sap.mapper;

import com.koliday.sap.entity.EmployeeEntity;
import com.koliday.sap.entity.UserEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;

@Repository
public interface UserMapper {
    UserEntity login(@Param("username")String username);

    Integer register(@Param("user")UserEntity userEntity);

    EmployeeEntity getEmployeeByEno(@Param("eno")String eno);

    UserEntity getUserByEno(@Param("eno")String eno);

    EmployeeEntity getEmployeeByEid(@Param("eid")Integer eid);
}
