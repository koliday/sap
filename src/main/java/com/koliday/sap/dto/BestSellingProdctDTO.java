package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BestSellingProdctDTO {
    private List<ProductDTO> kdProduct;
    private List<ProductDTO> pgProduct;
    private List<ProductDTO> stProduct;
    private List<ProductDTO> fnProduct;
    private List<ProductDTO> bbProduct;

}
