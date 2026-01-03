package com.personal.pos_api.security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Component
@Slf4j
public class JwtTokenProvider {
    @Value("${jwt.signerKey}")
    private String jwtSecret;

    @Value("${jwt.valid-duration}")
    private long validDuration;

    public String generateToken(Authentication authentication) {
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getId())
                .issuer("pos-api")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(validDuration, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(user))
                .build();

        SignedJWT signedJWT = new SignedJWT(
                new JWSHeader(JWSAlgorithm.HS256),
                jwtClaimsSet
        );

        try {
            signedJWT.sign(new MACSigner(jwtSecret.getBytes()));
            return signedJWT.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    private String buildScope(UserPrincipal user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        return stringJoiner.toString();
    }
}
