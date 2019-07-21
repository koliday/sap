package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class InvoicePreviewDTO {
    private Integer ivid;
    private String ivno;
    private String creator;
    private String createdate;
    private String clno;
    private String clname;
    private BigDecimal netvalue;
    private String billingdate;
    private String inno;
    private String indate;
    private String quno;
    private String qudate;
    private Integer orid;
    private String orno;
    private String ordate;
    private String deno;
    private String dedate;
}
