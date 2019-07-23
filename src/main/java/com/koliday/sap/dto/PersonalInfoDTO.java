package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonalInfoDTO {
    private Integer eid;
    private String eno;
    private String ename;
    private Integer level;
    private String levelstr;
    private String contact;
    private String address;
    private Integer leaderid;
    private String leaderno;
    private String leadername;
    private Integer status;
}
