package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class InvoiceDTO {
    private Integer ivid;
    private String ivno;
    private Integer orid;
    private String orno;
    private String payer;
    private Date billingdate;
    private String creator;
    private Date createdate;
    private BigDecimal netvalue;
}
