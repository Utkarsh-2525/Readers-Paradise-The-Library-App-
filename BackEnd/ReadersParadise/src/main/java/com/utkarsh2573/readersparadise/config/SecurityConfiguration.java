package com.utkarsh2573.readersparadise.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // disable Cross Site Request Forgery
        http.csrf(AbstractHttpConfigurer::disable);


        // protect endpoints
        http.authorizeRequests(configurer ->
                configurer.requestMatchers("/api/books/secure/**").authenticated().requestMatchers("/api/books/**", "/api/reviews/secure/**").permitAll()).oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()));

        // add CORS filter
        http.cors(Customizer.withDefaults());

        // add content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        // force a non-empty response body for 401 to make response-friendly
        Okta.configureResourceServer401ResponseBody(http);
        return http.build();
    }
}
