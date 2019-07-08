package com.koliday.sap.dto;

import com.koliday.sap.entity.EmployeeEntity;
import com.koliday.sap.entity.UserEntity;
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

    public UserDTO() {
    }
    public UserDTO(UserEntity userEntity,EmployeeEntity employeeEntity) {
        this.uid=userEntity.getUid();
        this.username=userEntity.getUsername();
        this.password=userEntity.getPassword();
        this.employeeEntity=employeeEntity;
        this.status=userEntity.getStatus();
    }
}
