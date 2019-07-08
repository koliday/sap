package com.koliday.sap.mapper;

import com.koliday.sap.entity.ClientEntity;
import com.koliday.sap.entity.ContactPersonEntity;
import com.koliday.sap.entity.VipEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VipMapper {

    List<VipEntity> getVipList();

}
