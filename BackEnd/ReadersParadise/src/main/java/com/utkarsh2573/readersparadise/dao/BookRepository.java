package com.utkarsh2573.readersparadise.dao;

import com.utkarsh2573.readersparadise.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long>
{

}
