package com.koliday.sap.dto;

import com.koliday.sap.entity.EmployeeEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private Integer uid;
    private String username;
    private String password;
    private EmployeeEntity employeeEntity;
    private Integer status;
}
