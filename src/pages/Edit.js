import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, InputNumber, Button, Card, message } from "antd";
import axios from "axios";

const Edit = () => {
    const { id } = useParams();
    const isAdd = id === undefined;
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        if (!isAdd) {
            axios
                .get(`http://localhost:3000/products/${id}`)
                .then((res) => {
                    form.setFieldsValue(res.data);
                })
                .catch(() => {
                    message.error("Không tìm thấy sản phẩm");
                    navigate("/");
                });
        } else {
            form.resetFields();
        }
    }, [id, isAdd, form, navigate]);

    const onFinish = (values) => {
        const request = isAdd
            ? axios.post("http://localhost:3000/products", values)
            : axios.put(`http://localhost:3000/products/${id}`, values);

        request
            .then(() => {
                message.success(isAdd ? "Thêm thành công" : "Cập nhật thành công");
                navigate("/");
            })
            .catch(() => {
                message.error("Lỗi khi lưu sản phẩm");
            });
    };

    return (
        <div style={{ maxWidth: 600, margin: "30px auto" }}>
            <Card title={isAdd ? "Thêm sản phẩm mới" : "Sửa sản phẩm"}>
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item name="title" label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {isAdd ? "Thêm" : "Cập nhật"}
                        </Button>{" "}
                        <Button onClick={() => navigate(-1)}>Huỷ</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Edit;
