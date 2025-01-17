package de.studytrade.studytradebackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Bean
        public SecurityFilterChain defaultFilterChain(HttpSecurity httpSecurity) throws Exception {
                return httpSecurity
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/api/v1/users/register", "/api/v1/users/error",
                                                                "/swagger-ui/**",
                                                                "/api/v1/**",
                                                                "/v3/api-docs/**")
                                                .permitAll()
                                                .anyRequest().authenticated())
                                .httpBasic(Customizer.withDefaults())
                                .formLogin(form -> form
                                        .loginPage("/login")
                                        .loginProcessingUrl("/perform_login")
                                        .defaultSuccessUrl("https://localhost:3000", true))
                                .build();
        }


        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}
