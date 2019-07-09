package com.koliday.sap.entity;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class InquiryEntity {
    private Integer inid;
    private String inno;
    private Integer client;
    private Integer creator;
    private Date createdate;
    private BigDecimal netvalue;
    private BigDecimal expectprofit;
    private Date validfrom;
    private Date validto;
    private Integer ifhavequo;
}
