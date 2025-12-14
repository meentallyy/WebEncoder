package com.example.backend.service;

import com.example.backend.dto.AuthRequest;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder encoder;

    public AuthService(UserRepository userRepo,
                       RoleRepository roleRepo,
                       PasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.encoder = encoder;
    }

    // Регистрация пользователя с ролью USER
    public void register(AuthRequest req) {
        User user = new User();
        user.setUsername(req.username());
        user.setPassword(encoder.encode(req.password())); // хэшируем пароль

        // ищем роль USER
        Role role = roleRepo.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role USER not found"));

        user.getRoles().add(role);
        userRepo.save(user);
    }
}
