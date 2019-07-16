package com.koliday.sap.mapper;

import com.koliday.sap.dto.DeliveryDTO;
import com.koliday.sap.dto.DeliveryItemDTO;
import com.koliday.sap.entity.DeliveryEntity;
import com.koliday.sap.entity.WarehouseEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Repository
public interface DeliveryMapper {
    Integer createDelivery(@Param("del") DeliveryEntity deliveryEntity);

    Integer selectDeliveryCount();

    List<WarehouseEntity> getWarehouse();

    Integer createDeliveryItem(@Param("item") DeliveryItemDTO deliveryItem);

    Integer updateOrderStatus(@Param("orid") Integer orid);

    List<DeliveryDTO> getUnpostedDelivery(@Param("creator") Integer creator);

    Integer postDelivery(@Param("deid")Integer deid);

    List<DeliveryDTO> getAllDelivery(@Param("creator") Integer creator);

    DeliveryDTO displayDelivery(@Param("deid") Integer deid);

    List<DeliveryItemDTO> displayDeliveryItem(@Param("deid")Integer deid);
}
