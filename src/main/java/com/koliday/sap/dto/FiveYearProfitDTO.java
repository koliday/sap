package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FiveYearProfitDTO {
    private int[] year;
    private FiveYearProfitDataDTO data;
}
