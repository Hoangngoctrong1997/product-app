import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, message } from "antd";
import axios from "axios";

const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch(() => {
                message.error("Không tìm thấy sản phẩm");
                navigate("/");
            });
    }, [id, navigate]);

    if (!product) return null;

    return (
        <div style={{ maxWidth: 600, margin: "30px auto" }}>
            <Card title={product.title}>
                <p><strong>Mô tả:</strong> {product.description}</p>
                <p>
                    <strong>Giá:</strong>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(product.price)}
                </p>
                <Button onClick={() => navigate("/")}>Quay lại</Button>
            </Card>
        </div>
    );
};

export default Detail;
