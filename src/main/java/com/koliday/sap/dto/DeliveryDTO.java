package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class DeliveryDTO {
    private Integer deid;
    private String deno;
    private String orid;
    private String client;
    private String creator;
    private Date createdate;
    private String destination;
    private Date deldate;
    private Date pickdate;
    private Integer pickstatus;
    private Integer poststatus;
}
