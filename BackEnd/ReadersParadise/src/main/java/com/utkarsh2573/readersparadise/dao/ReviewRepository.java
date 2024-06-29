package com.utkarsh2573.readersparadise.dao;

import com.utkarsh2573.readersparadise.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
