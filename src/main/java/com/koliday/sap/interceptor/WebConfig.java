package com.koliday.sap.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

/**

 *@desc 配置拦截器

 *@author  koliday

 *@date  2019/6/22
 */
@Configuration
//@EnableWebMvc不能加
public class WebConfig implements WebMvcConfigurer {
    private static final List<String> EXCLUDE_PATH = Arrays.asList("/","/login","/error","/assets/**","/img/**");
    @Autowired
    SessionInterceptor sessionInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        /*
         *  对登录页面、静态文件不需要进行拦截
         */
        registry.addInterceptor(sessionInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(EXCLUDE_PATH);
    }
}
