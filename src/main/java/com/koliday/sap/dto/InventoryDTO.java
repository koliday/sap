package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InventoryDTO {
    private Integer ivtid;
    private Integer whid;
    private Integer pid;
    private String pname;
    private String pno;
    private Integer price;
    private Integer cost;
    private Integer available;
    private Integer waittodelivery;
}
