package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WarehouseProductDTO {
    private Integer whid;
    private String whno;
    private Integer plid;
    private String whname;
    private String whaddress;
    private Integer available;
    private Integer waittodelivery;
}
