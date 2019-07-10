package com.koliday.sap.entity;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class QuotationEntity {
    private Integer quid;
    private String quno;
    private Integer inid;
    private Integer client;
    private Integer creator;
    private Date createdate;
    private BigDecimal netvalue;
    private BigDecimal expectvalue;
    private Integer discount;
    private BigDecimal netdiscount;
    private BigDecimal itemdiscount;
    private Date validfrom;
    private Date validto;
    private Date reqdate;
    private Integer ifhaveor;
}
