package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InvoicePreviewDetailDTO {
    private InvoicePreviewDTO inv;
    private List<SalesOrderItemDTO> itemlist;
}
