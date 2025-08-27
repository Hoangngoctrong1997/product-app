import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/products");
            setProducts(res.data);
        } catch {
            message.error("Không thể tải sản phẩm");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            message.success("Xoá thành công");
            fetchProducts();
        } catch {
            message.error("Lỗi khi xoá");
        }
    };

    const columns = [
        {
            title: "STT",
            render: (_, __, index) => index + 1,
            width: 50,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "title",
            render: (text, record) => (
                <Link to={`/detail/${record.id}`}>{text}</Link>
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
        },
        {
            title: "Giá",
            dataIndex: "price",
            render: (price) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(price),
        },
        {
            title: "Hành động",
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => navigate(`/edit/${record.id}`)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xoá sản phẩm này?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xoá"
                        cancelText="Huỷ"
                    >
                        <Button type="link" danger>
                            Xoá
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div style={{ maxWidth: 900, margin: "30px auto" }}>
            <h2>Danh sách sản phẩm</h2>
            <Button type="primary" onClick={() => navigate("/add")} style={{ marginBottom: 20 }}>
                Thêm mới
            </Button>
            <Table rowKey="id" columns={columns} dataSource={products} pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default Home;
