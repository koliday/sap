package com.koliday.sap.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactPersonEntity {
    private Integer cpid;
    private Integer clid;
    private String cpname;
    private String contact;
    private String address;
    private Integer deptno;
    private Integer func;
    private Integer vip;
    private Integer callfreq;
}
