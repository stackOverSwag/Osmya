package com.osmya.ecommerceapi.config;

import com.osmya.ecommerceapi.security.ApiKeyAuthFilter;
import com.osmya.ecommerceapi.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final ApiKeyAuthFilter apiKeyAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter,
                          ApiKeyAuthFilter apiKeyAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.apiKeyAuthFilter = apiKeyAuthFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // We use JWT + API key, no HTTP session
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers("/health").permitAll()
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()

                        // GraphQL endpoints (public for now, secure later if needed)
                        .requestMatchers("/graphiql", "/graphiql/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/graphql").permitAll()

                        // Products
                        .requestMatchers(HttpMethod.GET, "/products/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/products/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/products/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/products/**").hasRole("ADMIN")

                        // Users: only ADMIN
                        .requestMatchers("/users/**").hasRole("ADMIN")

                        // Internal service-to-service endpoints: only SERVICE (API key)
                        .requestMatchers("/internal/**").hasRole("SERVICE")

                        // anything else: must be authenticated
                        .anyRequest().authenticated()
                )
                // H2 console in a frame
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))
                // Filters: API key and JWT before UsernamePasswordAuthenticationFilter
                .addFilterBefore(apiKeyAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
