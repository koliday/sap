package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class QuotationDTO {
    private Integer quid;
    private String quno;
    private Integer inid;
    private String client;
    private String creator;
    private Date createdate;
    private BigDecimal netvalue;
    private BigDecimal expectvalue;
    private Integer discount;
    private BigDecimal netdiscount;
    private BigDecimal itemdiscount;
    private Date validfrom;
    private Date validto;
    private Date reqdate;
}
