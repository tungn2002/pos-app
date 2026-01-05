package com.personal.pos_api.controller;

import com.personal.pos_api.dto.ApiResponse;
import com.personal.pos_api.dto.request.AuthenticationRequest;
import com.personal.pos_api.dto.response.AuthenticationResponse;
import com.personal.pos_api.service.AuthService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> login(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse authResponse = authService.authenticate(request);
        ApiResponse<AuthenticationResponse> response =  ApiResponse.<AuthenticationResponse>builder().result(authResponse).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/token")
    public String testToken() {
        return "abc";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/token2")
    public String testToken2() {
        return "abc";
    }
}
