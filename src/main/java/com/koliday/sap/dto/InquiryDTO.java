package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
public class InquiryDTO {
    private Integer inid;
    private String inno;
    private String client;
    private String creator;
    private Date createdate;
    private BigDecimal netvalue;
    private BigDecimal expectprofit;
    private Date validfrom;
    private Date validto;
}
