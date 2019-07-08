package com.koliday.sap.mapper;

import com.koliday.sap.entity.DepartmentEntity;
import com.koliday.sap.entity.VipEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentMapper {

    List<DepartmentEntity> getDepList();

}
