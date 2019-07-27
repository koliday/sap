package com.koliday.sap.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ClientEntity {
    private Integer clid;
    private String clno;
    private String clname;
    private String clcontact;
    private String claddress;
    private Integer city;
    private String citystr;
    private String postcode;
    private Integer creator;
    private Date createtime;
    private Integer status;
}
