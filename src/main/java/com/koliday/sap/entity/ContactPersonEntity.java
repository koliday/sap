package com.koliday.sap.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ContactPersonEntity {
    private Integer cpid;
    private Integer clid;
    private String cpname;
    private String cpcontact;
    private String cpaddress;
    private Integer deptno;
    private Integer func;
    private Integer vip;
    private Integer callfreq;
    private Integer creator;
    private Date createtime;
    private Integer status;
}
