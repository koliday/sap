package com.koliday.sap.service.impl;

import com.koliday.sap.dto.DeliveryDTO;
import com.koliday.sap.dto.DeliveryDetailDTO;
import com.koliday.sap.dto.DeliveryItemDTO;
import com.koliday.sap.entity.DeliveryEntity;
import com.koliday.sap.entity.WarehouseEntity;
import com.koliday.sap.mapper.DeliveryMapper;
import com.koliday.sap.service.intf.DeliveryService;
import com.koliday.sap.utils.IdConvertToNoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryServiceImpl implements DeliveryService {
    @Autowired
    private DeliveryMapper deliveryMapper;
    @Override
    public Integer createDelivery(DeliveryEntity deliveryEntity,List<DeliveryItemDTO> deliveryItemDTOList) {
        Integer salesOrderCount=deliveryMapper.selectDeliveryCount();
        String deno= IdConvertToNoUtil.convertDelivery(salesOrderCount+1);
        deliveryEntity.setDeno(deno);
        Integer salesOrderResult=deliveryMapper.createDelivery(deliveryEntity);
        if(salesOrderResult<1)
            return 0;
        Integer deid=deliveryEntity.getDeid();
        Integer inquiryItemResult=createDeliveryItem(deliveryItemDTOList,deid);
        if(inquiryItemResult<1)
            return 0;
        Integer updateorderstatus=updateOrderStatus(deliveryEntity.getOrid());
        if(updateorderstatus<1)
            return 0;
        return deid;
    }



    private Integer createDeliveryItem(List<DeliveryItemDTO> deliveryItemDTOList,Integer deid){
        Integer result=0;
        for(DeliveryItemDTO deliveryItemDTO:deliveryItemDTOList){
            deliveryItemDTO.setDeid(deid);
            result+=deliveryMapper.createDeliveryItem(deliveryItemDTO);
        }
        return result;
    }

    private Integer updateOrderStatus(Integer orid){
        return deliveryMapper.updateOrderStatus(orid);
    }


    @Override
    public List<WarehouseEntity> getWarehouse() {
        return deliveryMapper.getWarehouse();
    }


    @Override
    public List<DeliveryDTO> getUnpostedDelivery(Integer creator) {
        return deliveryMapper.getUnpostedDelivery(creator);
    }

    @Override
    public Integer postDelivery(Integer deid) {
        return deliveryMapper.postDelivery(deid);
    }

    @Override
    public List<DeliveryDTO> getAllDelivery(Integer creator) {
        return deliveryMapper.getAllDelivery(creator);
    }

    @Override
    public DeliveryDetailDTO displayDeliveryDetail(Integer deid) {
        DeliveryDetailDTO deliveryDetailDTO=new DeliveryDetailDTO();
        deliveryDetailDTO.setDeliveryDTO(deliveryMapper.displayDelivery(deid));
        deliveryDetailDTO.setDeliveryItemDTOList(deliveryMapper.displayDeliveryItem(deid));
        return deliveryDetailDTO;
    }


}
