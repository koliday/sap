package com.koliday.sap;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@MapperScan("com.koliday.sap.mapper")
@SpringBootApplication
public class SapApplication {

    public static void main(String[] args) {
        SpringApplication.run(SapApplication.class, args);
    }

}
