from pydantic import BaseModel
from typing import Optional

# --- Product Schemas ---
class ProductBase(BaseModel):
    name: str
    sku: str
    price: float
    quantity: int

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    class Config:
        from_attributes = True

# --- Customer Schemas ---
class CustomerBase(BaseModel):
    full_name: str
    email: str
    phone_number: str

class CustomerCreate(CustomerBase):
    pass

class Customer(CustomerBase):
    id: int
    class Config:
       from_attributes = True

# --- Order Schemas ---
class OrderBase(BaseModel):
    customer_id: int
    product_id: int
    quantity: int

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: int
    total_amount: float
    class Config:
        from_attributes = True