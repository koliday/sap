package com.koliday.sap.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientEntity {
    private Integer clid;
    private String clno;
    private String clname;
    private String contact;
    private String address;
    private Integer city;
    private String postcode;
    private Integer creator;
}
