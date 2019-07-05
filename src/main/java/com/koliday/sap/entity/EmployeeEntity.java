package com.koliday.sap.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeEntity {
    private Integer eid;
    private String eno;
    private String ename;
    private Integer level;
    private String contact;
    private String address;
    private Integer leaderid;
    private Integer status;
}
