package com.koliday.sap.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class InvoiceEntity {
    private Integer ivid;
    private String ivno;
    private Integer orid;
    private Integer payer;
    private Date billingdate;
    private Integer creator;
    private Date createdate;
}
