package com.currencymanagement.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Currency Management API")
                        .description("API quản lý tỷ giá tiền tệ - Currency Management System")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Currency Management Team")
                                .email("support@currencymanagement.com")
                                .url("https://currencymanagement.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
} 