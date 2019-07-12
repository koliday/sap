package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class SalesOrderDTO {
    private Integer orid;
    private String orno;
    private Integer quid;
    private String client;
    private String creator;
    private Date createdate;
    private BigDecimal netvalue;
    private Integer discount;
    private BigDecimal netdiscount;
    private BigDecimal itemdiscount;
    private Date validfrom;
    private Date validto;
    private Date reqdate;
}
