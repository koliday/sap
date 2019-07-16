package com.koliday.sap.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class DeliveryEntity {
    private Integer deid;
    private String deno;
    private Integer orid;
    private Integer clid;
    private Integer creator;
    private Date createdate;
    private String destination;
    private Date deldate;
    private Date pickdate;
    private Integer pickstatus;
    private Integer poststatus;
}
