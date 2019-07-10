package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class QuotationDTO {
    private Integer inid;
    private Integer client;
    private Integer creator;
    private Date createdate;
    private BigDecimal expectprofit;
    private Integer discount;
    private BigDecimal netdiscount;
    private BigDecimal itemdiscount;
    private Date validfrom;
    private Date validto;
}
