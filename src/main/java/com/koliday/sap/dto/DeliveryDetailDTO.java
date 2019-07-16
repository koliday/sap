package com.koliday.sap.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DeliveryDetailDTO {
    private DeliveryDTO deliveryDTO;
    private List<DeliveryItemDTO> deliveryItemDTOList;
}
