package de.studytrade.studytradebackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Date;

@Document(collection = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    private ObjectId id;
    private String name;
    private String description;
    private List<String> category;
    private String condition;
    private float price;
    private String img;
    private int productId;
    private Date creationDate;

}