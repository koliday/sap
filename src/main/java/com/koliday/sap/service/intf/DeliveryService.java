package com.koliday.sap.service.intf;

import com.koliday.sap.dto.DeliveryDTO;
import com.koliday.sap.dto.DeliveryDetailDTO;
import com.koliday.sap.dto.DeliveryItemDTO;
import com.koliday.sap.entity.DeliveryEntity;
import com.koliday.sap.entity.WarehouseEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DeliveryService {
    Integer createDelivery(DeliveryEntity deliveryEntity,List<DeliveryItemDTO> deliveryItemDTOList);

    List<WarehouseEntity> getWarehouse();

    List<DeliveryDTO> getUnpostedDelivery(Integer creator);

    Integer postDelivery(Integer deid);

    List<DeliveryDTO> getAllDelivery(Integer creator);

    DeliveryDetailDTO displayDeliveryDetail(Integer deid);


}
