package com.koliday.sap.entity;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class SalesOrderEntity {
    private Integer orid;
    private String orno;
    private Integer quid;
    private Integer client;
    private Integer creator;
    private Date createdate;
    private BigDecimal netvalue;
    private Date validfrom;
    private Date validto;
    private Date reqdate;
    private Integer ifinvoice;
    private Integer ifhavedlv;
}
