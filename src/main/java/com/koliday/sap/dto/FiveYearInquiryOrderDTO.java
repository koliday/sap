package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FiveYearInquiryOrderDTO {
    private String year;
    private Integer inquiryCount;
    private Integer orderCount;
}
